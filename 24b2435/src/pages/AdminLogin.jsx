import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/client";
import { useAuth } from "../components/AuthContext";
import { useToast } from "../components/Toast";
import { ShieldIcon } from "../components/Icons";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const res = await api.login({ username, password });
      login(res.token, res.username);
      showToast(`Welcome back, ${res.username}!`);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err?.response?.data?.error || "Invalid credentials");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container-page flex min-h-[75vh] items-center justify-center py-16">
      <div className="w-full max-w-md rounded-2xl border border-slate-100 bg-white p-8 shadow-card">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
          <ShieldIcon className="h-7 w-7" />
        </div>
        <h1 className="mt-4 text-center font-display text-2xl font-bold text-slate-800">
          Admin Login
        </h1>
        <p className="mt-1 text-center text-sm text-slate-500">
          Staff access to manage appointments &amp; messages
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="label-field">Username</label>
            <input value={username} onChange={(e) => setUsername(e.target.value)} className="input-field" placeholder="admin" />
          </div>
          <div>
            <label className="label-field">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              placeholder="••••••••"
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button type="submit" disabled={submitting} className="btn-primary w-full disabled:opacity-60">
            {submitting ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="mt-5 rounded-lg bg-slate-50 p-3 text-center text-xs text-slate-500">
          Demo credentials — username: <strong>admin</strong>, password:{" "}
          <strong>hospital@24b2435</strong>
        </p>
      </div>
    </div>
  );
}
