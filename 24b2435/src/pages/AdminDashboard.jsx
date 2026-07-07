import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/client";
import { useAuth } from "../components/AuthContext";
import { useToast } from "../components/Toast";
import { CalendarIcon, MailIcon, ShieldIcon } from "../components/Icons";

const statusStyles = {
  Pending: "bg-amber-100 text-amber-700",
  Confirmed: "bg-teal-100 text-teal-700",
  Completed: "bg-brand-100 text-brand-700",
  Cancelled: "bg-red-100 text-red-700",
};

export default function AdminDashboard() {
  const { username, logout } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [tab, setTab] = useState("appointments");
  const [appointments, setAppointments] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    Promise.all([api.getAppointments(), api.getContactMessages()])
      .then(([a, m]) => {
        setAppointments(a);
        setMessages(m);
      })
      .catch(() => showToast("Session expired, please log in again", "error"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await api.updateAppointment(id, { status });
      setAppointments((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
      showToast("Appointment updated");
    } catch {
      showToast("Could not update appointment", "error");
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.deleteAppointment(id);
      setAppointments((prev) => prev.filter((a) => a.id !== id));
      showToast("Appointment removed");
    } catch {
      showToast("Could not delete appointment", "error");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <div className="container-page py-10">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
            <ShieldIcon className="h-6 w-6" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold text-slate-800">Admin Dashboard</h1>
            <p className="text-sm text-slate-500">Signed in as {username}</p>
          </div>
        </div>
        <button onClick={handleLogout} className="btn-secondary">
          Log Out
        </button>
      </div>

      <div className="mt-8 flex gap-2 border-b border-slate-100">
        <button
          onClick={() => setTab("appointments")}
          className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-semibold transition-colors ${
            tab === "appointments" ? "border-brand-600 text-brand-600" : "border-transparent text-slate-500"
          }`}
        >
          <CalendarIcon className="h-4 w-4" /> Appointments ({appointments.length})
        </button>
        <button
          onClick={() => setTab("messages")}
          className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-semibold transition-colors ${
            tab === "messages" ? "border-brand-600 text-brand-600" : "border-transparent text-slate-500"
          }`}
        >
          <MailIcon className="h-4 w-4" /> Messages ({messages.length})
        </button>
      </div>

      {loading ? (
        <p className="py-16 text-center text-slate-500">Loading dashboard data...</p>
      ) : tab === "appointments" ? (
        <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-100 shadow-card">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-4 py-3 font-semibold">Patient</th>
                <th className="px-4 py-3 font-semibold">Contact</th>
                <th className="px-4 py-3 font-semibold">Doctor / Dept</th>
                <th className="px-4 py-3 font-semibold">Date & Time</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {appointments.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-slate-400">
                    No appointments yet.
                  </td>
                </tr>
              )}
              {appointments.map((a) => (
                <tr key={a.id}>
                  <td className="px-4 py-3 font-medium text-slate-800">{a.patient_name}</td>
                  <td className="px-4 py-3 text-slate-500">
                    {a.email}
                    <br />
                    {a.phone}
                  </td>
                  <td className="px-4 py-3 text-slate-500">
                    {a.doctor_name || "No preference"}
                    <br />
                    {a.department_name || "-"}
                  </td>
                  <td className="px-4 py-3 text-slate-500">
                    {a.preferred_date}
                    <br />
                    {a.preferred_time}
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={a.status}
                      onChange={(e) => handleStatusChange(a.id, e.target.value)}
                      className={`rounded-lg border-none px-2 py-1 text-xs font-semibold ${statusStyles[a.status]}`}
                    >
                      {Object.keys(statusStyles).map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleDelete(a.id)}
                      className="text-xs font-semibold text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {messages.length === 0 && (
            <p className="py-16 text-center text-slate-500">No messages yet.</p>
          )}
          {messages.map((m) => (
            <div key={m.id} className="card">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-display font-semibold text-slate-800">{m.subject}</h3>
                <span className="text-xs text-slate-400">{m.created_at}</span>
              </div>
              <p className="mt-1 text-sm text-slate-500">
                {m.name} &middot; {m.email}
              </p>
              <p className="mt-3 text-sm text-slate-600">{m.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
