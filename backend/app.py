import os
from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
from werkzeug.security import check_password_hash

from database import get_db, init_db
from auth import generate_token, token_required

# Path to the built React app (created by `npm run build` inside ../24b2435)
FRONTEND_DIST = os.path.join(os.path.dirname(__file__), "..", "24b2435", "dist")

app = Flask(__name__, static_folder=None)
app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY", "dev-secret-change-in-production")
CORS(app)

init_db()


def row_to_dict(row):
    return dict(row) if row else None


# ---------------------------------------------------------------- health
@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({"status": "ok", "service": "hospital-backend"})


# ---------------------------------------------------------------- departments
@app.route("/api/departments", methods=["GET"])
def get_departments():
    conn = get_db()
    rows = conn.execute("SELECT * FROM departments ORDER BY name").fetchall()
    conn.close()
    return jsonify([row_to_dict(r) for r in rows])


# ---------------------------------------------------------------- doctors
@app.route("/api/doctors", methods=["GET"])
def get_doctors():
    department_id = request.args.get("department_id")
    search = request.args.get("search", "").strip()

    conn = get_db()
    query = """
        SELECT doctors.*, departments.name AS department_name
        FROM doctors
        JOIN departments ON doctors.department_id = departments.id
        WHERE 1=1
    """
    params = []
    if department_id:
        query += " AND doctors.department_id = ?"
        params.append(department_id)
    if search:
        query += " AND (doctors.name LIKE ? OR departments.name LIKE ?)"
        like = f"%{search}%"
        params.extend([like, like])
    query += " ORDER BY doctors.rating DESC"

    rows = conn.execute(query, params).fetchall()
    conn.close()
    return jsonify([row_to_dict(r) for r in rows])


@app.route("/api/doctors/<int:doctor_id>", methods=["GET"])
def get_doctor(doctor_id):
    conn = get_db()
    row = conn.execute(
        """SELECT doctors.*, departments.name AS department_name
           FROM doctors JOIN departments ON doctors.department_id = departments.id
           WHERE doctors.id = ?""",
        (doctor_id,),
    ).fetchone()
    conn.close()
    if not row:
        return jsonify({"error": "Doctor not found"}), 404
    return jsonify(row_to_dict(row))


# ---------------------------------------------------------------- appointments
@app.route("/api/appointments", methods=["POST"])
def create_appointment():
    data = request.get_json(force=True, silent=True) or {}
    required = ["patient_name", "email", "phone", "preferred_date", "preferred_time"]
    missing = [f for f in required if not data.get(f)]
    if missing:
        return jsonify({"error": f"Missing required fields: {', '.join(missing)}"}), 400

    conn = get_db()
    cur = conn.execute(
        """INSERT INTO appointments
           (patient_name, email, phone, department_id, doctor_id, preferred_date, preferred_time, reason)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)""",
        (
            data["patient_name"],
            data["email"],
            data["phone"],
            data.get("department_id"),
            data.get("doctor_id"),
            data["preferred_date"],
            data["preferred_time"],
            data.get("reason", ""),
        ),
    )
    conn.commit()
    new_id = cur.lastrowid
    conn.close()
    return jsonify({"message": "Appointment request received", "id": new_id}), 201


@app.route("/api/appointments", methods=["GET"])
@token_required
def list_appointments():
    conn = get_db()
    rows = conn.execute(
        """SELECT appointments.*, departments.name AS department_name, doctors.name AS doctor_name
           FROM appointments
           LEFT JOIN departments ON appointments.department_id = departments.id
           LEFT JOIN doctors ON appointments.doctor_id = doctors.id
           ORDER BY appointments.created_at DESC"""
    ).fetchall()
    conn.close()
    return jsonify([row_to_dict(r) for r in rows])


@app.route("/api/appointments/<int:appointment_id>", methods=["PATCH"])
@token_required
def update_appointment(appointment_id):
    data = request.get_json(force=True, silent=True) or {}
    status = data.get("status")
    if status not in ("Pending", "Confirmed", "Cancelled", "Completed"):
        return jsonify({"error": "Invalid status value"}), 400

    conn = get_db()
    conn.execute("UPDATE appointments SET status = ? WHERE id = ?", (status, appointment_id))
    conn.commit()
    conn.close()
    return jsonify({"message": "Appointment updated"})


@app.route("/api/appointments/<int:appointment_id>", methods=["DELETE"])
@token_required
def delete_appointment(appointment_id):
    conn = get_db()
    conn.execute("DELETE FROM appointments WHERE id = ?", (appointment_id,))
    conn.commit()
    conn.close()
    return jsonify({"message": "Appointment deleted"})


# ---------------------------------------------------------------- contact
@app.route("/api/contact", methods=["POST"])
def create_contact_message():
    data = request.get_json(force=True, silent=True) or {}
    required = ["name", "email", "subject", "message"]
    missing = [f for f in required if not data.get(f)]
    if missing:
        return jsonify({"error": f"Missing required fields: {', '.join(missing)}"}), 400

    conn = get_db()
    conn.execute(
        "INSERT INTO contact_messages (name, email, subject, message) VALUES (?, ?, ?, ?)",
        (data["name"], data["email"], data["subject"], data["message"]),
    )
    conn.commit()
    conn.close()
    return jsonify({"message": "Message sent successfully"}), 201


@app.route("/api/contact", methods=["GET"])
@token_required
def list_contact_messages():
    conn = get_db()
    rows = conn.execute("SELECT * FROM contact_messages ORDER BY created_at DESC").fetchall()
    conn.close()
    return jsonify([row_to_dict(r) for r in rows])


# ---------------------------------------------------------------- auth
@app.route("/api/auth/login", methods=["POST"])
def login():
    data = request.get_json(force=True, silent=True) or {}
    username = data.get("username", "")
    password = data.get("password", "")

    conn = get_db()
    row = conn.execute("SELECT * FROM admin WHERE username = ?", (username,)).fetchone()
    conn.close()

    if not row or not check_password_hash(row["password_hash"], password):
        return jsonify({"error": "Invalid username or password"}), 401

    token = generate_token(username)
    return jsonify({"token": token, "username": username})


@app.route("/api/auth/verify", methods=["GET"])
@token_required
def verify():
    return jsonify({"valid": True})


# ---------------------------------------------------------------- serve frontend
# Serves the built React app (24b2435/dist) for every non-API route, so that
# client-side routing (React Router) works correctly on refresh/deep-links.
@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve_frontend(path):
    if path.startswith("api/"):
        return jsonify({"error": "Not found"}), 404

    full_path = os.path.join(FRONTEND_DIST, path)
    if path and os.path.exists(full_path) and os.path.isfile(full_path):
        return send_from_directory(FRONTEND_DIST, path)

    index_path = os.path.join(FRONTEND_DIST, "index.html")
    if os.path.exists(index_path):
        return send_from_directory(FRONTEND_DIST, "index.html")

    return jsonify({
        "error": "Frontend build not found. Run 'npm run build' inside 24b2435/ first."
    }), 404


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)
