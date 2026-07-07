import sqlite3
import os

DB_PATH = os.path.join(os.path.dirname(__file__), "hospital.db")


def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA foreign_keys = ON")
    return conn


SCHEMA = """
CREATE TABLE IF NOT EXISTS departments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    icon TEXT NOT NULL,
    description TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS doctors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    department_id INTEGER NOT NULL,
    qualification TEXT NOT NULL,
    experience_years INTEGER NOT NULL,
    timing TEXT NOT NULL,
    rating REAL NOT NULL,
    photo_url TEXT NOT NULL,
    FOREIGN KEY (department_id) REFERENCES departments (id)
);

CREATE TABLE IF NOT EXISTS appointments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    patient_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    department_id INTEGER,
    doctor_id INTEGER,
    preferred_date TEXT NOT NULL,
    preferred_time TEXT NOT NULL,
    reason TEXT,
    status TEXT NOT NULL DEFAULT 'Pending',
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (department_id) REFERENCES departments (id),
    FOREIGN KEY (doctor_id) REFERENCES doctors (id)
);

CREATE TABLE IF NOT EXISTS contact_messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS admin (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL
);
"""

DEPARTMENTS = [
    ("Cardiology", "heart", "Comprehensive heart care including diagnostics, angioplasty, and cardiac surgery."),
    ("Neurology", "brain", "Advanced treatment for disorders of the brain, spine, and nervous system."),
    ("Orthopedics", "bone", "Bone, joint, and spine care with modern trauma and replacement surgery."),
    ("Pediatrics", "baby", "Dedicated child healthcare from newborn care to adolescent medicine."),
    ("Dermatology", "skin", "Skin, hair, and nail treatments including cosmetic dermatology."),
    ("ENT", "ear", "Ear, nose, and throat care with the latest endoscopic techniques."),
    ("General Medicine", "stethoscope", "Primary care, diagnostics, and management of chronic conditions."),
    ("Emergency & Trauma", "ambulance", "24x7 emergency care with a dedicated trauma response team."),
]

DOCTORS = [
    ("Dr. Aditi Sharma", "Cardiology", "MD, DM Cardiology", 14, "Mon-Fri, 10 AM - 4 PM", 4.9, "https://randomuser.me/api/portraits/women/65.jpg"),
    ("Dr. Rohan Mehta", "Cardiology", "MBBS, MD, FACC", 10, "Mon-Sat, 9 AM - 1 PM", 4.7, "https://randomuser.me/api/portraits/men/32.jpg"),
    ("Dr. Kavita Rao", "Neurology", "MD, DM Neurology", 16, "Tue-Sat, 11 AM - 5 PM", 4.8, "https://randomuser.me/api/portraits/women/68.jpg"),
    ("Dr. Sameer Iyer", "Orthopedics", "MS Ortho, FRCS", 12, "Mon-Fri, 9 AM - 3 PM", 4.6, "https://randomuser.me/api/portraits/men/45.jpg"),
    ("Dr. Neha Kapoor", "Pediatrics", "MD Pediatrics", 9, "Mon-Sat, 10 AM - 2 PM", 4.9, "https://randomuser.me/api/portraits/women/70.jpg"),
    ("Dr. Arjun Verma", "Dermatology", "MD Dermatology", 8, "Tue-Sun, 12 PM - 6 PM", 4.5, "https://randomuser.me/api/portraits/men/52.jpg"),
    ("Dr. Priya Nair", "ENT", "MS ENT", 11, "Mon-Fri, 10 AM - 4 PM", 4.7, "https://randomuser.me/api/portraits/women/72.jpg"),
    ("Dr. Vikram Singh", "General Medicine", "MBBS, MD", 20, "Mon-Sat, 8 AM - 2 PM", 4.8, "https://randomuser.me/api/portraits/men/60.jpg"),
    ("Dr. Ananya Das", "Emergency & Trauma", "MBBS, MEM", 7, "24x7 Rotational", 4.6, "https://randomuser.me/api/portraits/women/75.jpg"),
    ("Dr. Karan Malhotra", "Orthopedics", "MS Ortho", 15, "Mon-Fri, 11 AM - 5 PM", 4.8, "https://randomuser.me/api/portraits/men/65.jpg"),
]

ADMIN_USERNAME = "admin"
ADMIN_PASSWORD = "hospital@24b2435"


def init_db():
    conn = get_db()
    conn.executescript(SCHEMA)

    if conn.execute("SELECT COUNT(*) FROM departments").fetchone()[0] == 0:
        dept_ids = {}
        for name, icon, desc in DEPARTMENTS:
            cur = conn.execute(
                "INSERT INTO departments (name, icon, description) VALUES (?, ?, ?)",
                (name, icon, desc),
            )
            dept_ids[name] = cur.lastrowid

        for name, dept_name, qual, exp, timing, rating, photo_url in DOCTORS:
            conn.execute(
                """INSERT INTO doctors
                (name, department_id, qualification, experience_years, timing, rating, photo_url)
                VALUES (?, ?, ?, ?, ?, ?, ?)""",
                (name, dept_ids[dept_name], qual, exp, timing, rating, photo_url),
            )
        conn.commit()

    if conn.execute("SELECT COUNT(*) FROM admin").fetchone()[0] == 0:
        from werkzeug.security import generate_password_hash
        conn.execute(
            "INSERT INTO admin (username, password_hash) VALUES (?, ?)",
            (ADMIN_USERNAME, generate_password_hash(ADMIN_PASSWORD)),
        )
        conn.commit()

    conn.close()
