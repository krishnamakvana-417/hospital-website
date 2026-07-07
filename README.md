# Sanjeevani Hospital — Full-Stack Website

**Submission by:** Krishna | **Roll No:** 24B2435

A full-stack multispeciality hospital website with online appointment booking,
doctor/department discovery, a contact form, and a JWT-secured admin
dashboard.

## Structure

```
hospital-website/
├── 24b2435/        <- React frontend (Vite + Tailwind + Framer Motion)
└── backend/        <- Python Flask REST API + SQLite
```

## Tech Stack

- **Frontend:** React 18, Vite, React Router, Tailwind CSS, Framer Motion, Axios
- **Backend:** Flask, Flask-CORS, PyJWT, SQLite (zero-config, file-based DB)
- **Auth:** JWT tokens for the admin dashboard; passwords hashed with Werkzeug

## Running Locally

### 1. Backend

```bash
cd backend
pip install -r requirements.txt
python3 app.py
```

Runs on `http://localhost:5000`. The SQLite database (`hospital.db`) and
seed data (8 departments, 10 doctors, 1 admin account) are created
automatically on first run.

**Default admin login:** username `admin`, password `hospital@24b2435`
(change this in `database.py` before deploying publicly).

### 2. Frontend

```bash
cd 24b2435
npm install
npm run dev
```

Runs on `http://localhost:5173` and talks to the backend at
`http://localhost:5000` by default (see `.env.example` — copy it to `.env`
and set `VITE_API_URL` if your backend runs elsewhere).

## Deploying (free tier)

**Backend → Render.com or Railway.app**
1. Push this repo to GitHub.
2. Create a new Web Service, root directory `backend`.
3. Build command: `pip install -r requirements.txt`
4. Start command: `python app.py` (or `gunicorn app:app` for production —
   add `gunicorn` to `requirements.txt` if so)
5. Set an environment variable `SECRET_KEY` to a random string.
6. Note the deployed URL, e.g. `https://your-app.onrender.com`.

**Frontend → Vercel or Netlify**
1. Import the same repo, set root directory to `24b2435`.
2. Build command: `npm run build`, output directory: `dist`.
3. Add environment variable `VITE_API_URL` = your backend URL from above.
4. Deploy — you'll get a public URL to submit.

## Features

See the in-app **Features** page (`/features`) for a full breakdown of
patient-facing and admin-facing functionality.
