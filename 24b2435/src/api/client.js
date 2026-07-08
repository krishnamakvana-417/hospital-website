import axios from "axios";

// In dev (npm run dev) with no .env, talk to the local Flask server on :5000.
// In a production build with no VITE_API_URL set, use a relative path — this
// is what makes the combined single-deployment setup work (Flask serves the
// built frontend and the API from the same origin).
const BASE_URL = import.meta.env.VITE_API_URL ?? (import.meta.env.DEV ? "http://localhost:5000" : "");

const client = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

client.interceptors.request.use((config) => {
  const token = localStorage.getItem("admin_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const api = {
  getDepartments: () => client.get("/api/departments").then((r) => r.data),
  getDoctors: (params = {}) => client.get("/api/doctors", { params }).then((r) => r.data),
  getDoctor: (id) => client.get(`/api/doctors/${id}`).then((r) => r.data),
  bookAppointment: (payload) => client.post("/api/appointments", payload).then((r) => r.data),
  sendContactMessage: (payload) => client.post("/api/contact", payload).then((r) => r.data),
  login: (payload) => client.post("/api/auth/login", payload).then((r) => r.data),
  getAppointments: () => client.get("/api/appointments").then((r) => r.data),
  updateAppointment: (id, payload) => client.patch(`/api/appointments/${id}`, payload).then((r) => r.data),
  deleteAppointment: (id) => client.delete(`/api/appointments/${id}`).then((r) => r.data),
  getContactMessages: () => client.get("/api/contact").then((r) => r.data),
};

export default client;
