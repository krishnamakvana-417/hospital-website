import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { api } from "../api/client";
import { useToast } from "../components/Toast";
import { CalendarIcon, CheckCircleIcon, ClockIcon } from "../components/Icons";

const timeSlots = ["9:00 AM", "10:00 AM", "11:30 AM", "1:00 PM", "2:30 PM", "4:00 PM", "5:30 PM"];

function todayISO() {
  return new Date().toISOString().split("T")[0];
}

export default function Appointments() {
  const [searchParams] = useSearchParams();
  const { showToast } = useToast();

  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [confirmationId, setConfirmationId] = useState(null);

  const [form, setForm] = useState({
    patient_name: "",
    email: "",
    phone: "",
    department_id: "",
    doctor_id: searchParams.get("doctorId") || "",
    preferred_date: "",
    preferred_time: "",
    reason: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    Promise.all([api.getDepartments(), api.getDoctors()]).then(([deps, docs]) => {
      setDepartments(deps);
      setDoctors(docs);

      const preselectedId = searchParams.get("doctorId");
      if (preselectedId) {
        const doc = docs.find((d) => String(d.id) === preselectedId);
        if (doc) {
          setForm((f) => ({ ...f, doctor_id: doc.id, department_id: doc.department_id }));
        }
      }
    });
  }, [searchParams]);

  const filteredDoctors = useMemo(() => {
    if (!form.department_id) return doctors;
    return doctors.filter((d) => String(d.department_id) === String(form.department_id));
  }, [doctors, form.department_id]);

  const update = (field) => (e) => {
    const value = e.target.value;
    setForm((f) => ({ ...f, [field]: value, ...(field === "department_id" ? { doctor_id: "" } : {}) }));
    setErrors((er) => ({ ...er, [field]: undefined }));
  };

  const validate = () => {
    const er = {};
    if (!form.patient_name.trim()) er.patient_name = "Please enter your name";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) er.email = "Enter a valid email address";
    if (!/^[+\d][\d\s-]{7,}$/.test(form.phone)) er.phone = "Enter a valid phone number";
    if (!form.preferred_date) er.preferred_date = "Select a preferred date";
    if (!form.preferred_time) er.preferred_time = "Select a preferred time slot";
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      const payload = {
        ...form,
        department_id: form.department_id || null,
        doctor_id: form.doctor_id || null,
      };
      const res = await api.bookAppointment(payload);
      setConfirmationId(res.id);
      showToast("Appointment request submitted successfully!");
    } catch (err) {
      showToast(
        err?.response?.data?.error || "Something went wrong. Please try again.",
        "error"
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (confirmationId) {
    return (
      <div className="container-page flex min-h-[70vh] items-center justify-center py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="w-full max-w-lg rounded-2xl border border-teal-100 bg-teal-50 p-10 text-center"
        >
          <CheckCircleIcon className="mx-auto h-16 w-16 text-teal-600" />
          <h2 className="mt-5 font-display text-2xl font-bold text-slate-800">
            Appointment Requested!
          </h2>
          <p className="mt-2 text-slate-600">
            Reference ID <strong>#APT-{confirmationId}</strong>. Our care team will call{" "}
            <strong>{form.phone}</strong> within 30 minutes to confirm your slot on{" "}
            <strong>{form.preferred_date}</strong> at <strong>{form.preferred_time}</strong>.
          </p>
          <button
            onClick={() => {
              setConfirmationId(null);
              setForm({
                patient_name: "",
                email: "",
                phone: "",
                department_id: "",
                doctor_id: "",
                preferred_date: "",
                preferred_time: "",
                reason: "",
              });
            }}
            className="btn-primary mt-6"
          >
            Book Another Appointment
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div>
      <section className="bg-gradient-to-br from-brand-950 to-brand-700 py-16 text-white">
        <div className="container-page text-center">
          <span className="section-eyebrow bg-white/10 !text-teal-300">Book Appointment</span>
          <h1 className="mt-4 font-display text-4xl font-bold sm:text-5xl">
            Schedule Your Visit
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-slate-200">
            Fill in your details below — our care coordinators confirm every
            booking by phone within the hour.
          </p>
        </div>
      </section>

      <section className="container-page py-14">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 lg:grid-cols-[1.4fr,1fr]">
          <form onSubmit={handleSubmit} className="card space-y-5">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className="label-field">Full Name *</label>
                <input
                  value={form.patient_name}
                  onChange={update("patient_name")}
                  placeholder="e.g. Priya Kulkarni"
                  className="input-field"
                />
                {errors.patient_name && <p className="mt-1 text-xs text-red-500">{errors.patient_name}</p>}
              </div>
              <div>
                <label className="label-field">Phone Number *</label>
                <input
                  value={form.phone}
                  onChange={update("phone")}
                  placeholder="e.g. +91 98765 43210"
                  className="input-field"
                />
                {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
              </div>
            </div>

            <div>
              <label className="label-field">Email Address *</label>
              <input
                type="email"
                value={form.email}
                onChange={update("email")}
                placeholder="e.g. priya@email.com"
                className="input-field"
              />
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className="label-field">Department</label>
                <select value={form.department_id} onChange={update("department_id")} className="input-field">
                  <option value="">Any / Not sure</option>
                  {departments.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="label-field">Preferred Doctor</label>
                <select value={form.doctor_id} onChange={update("doctor_id")} className="input-field">
                  <option value="">No preference</option>
                  {filteredDoctors.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name} &middot; {d.department_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className="label-field">Preferred Date *</label>
                <input
                  type="date"
                  min={todayISO()}
                  value={form.preferred_date}
                  onChange={update("preferred_date")}
                  className="input-field"
                />
                {errors.preferred_date && (
                  <p className="mt-1 text-xs text-red-500">{errors.preferred_date}</p>
                )}
              </div>
              <div>
                <label className="label-field">Preferred Time *</label>
                <select value={form.preferred_time} onChange={update("preferred_time")} className="input-field">
                  <option value="">Select a slot</option>
                  {timeSlots.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                {errors.preferred_time && (
                  <p className="mt-1 text-xs text-red-500">{errors.preferred_time}</p>
                )}
              </div>
            </div>

            <div>
              <label className="label-field">Reason for Visit (optional)</label>
              <textarea
                value={form.reason}
                onChange={update("reason")}
                rows={3}
                placeholder="Briefly describe your symptoms or reason for the visit"
                className="input-field resize-none"
              />
            </div>

            <button type="submit" disabled={submitting} className="btn-primary w-full disabled:opacity-60">
              {submitting ? "Submitting..." : "Confirm Appointment Request"}
            </button>
          </form>

          <div className="space-y-5">
            <div className="card">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <CalendarIcon className="h-5 w-5" />
                </div>
                <h3 className="font-display font-semibold text-slate-800">How Booking Works</h3>
              </div>
              <ol className="mt-4 space-y-3 text-sm text-slate-600">
                <li>1. Fill the form with your details and preferred slot.</li>
                <li>2. Our care coordinator calls to confirm within 30 minutes.</li>
                <li>3. Receive a confirmation SMS/email with your visit details.</li>
                <li>4. Arrive 15 minutes early with any previous reports.</li>
              </ol>
            </div>

            <div className="card bg-red-50">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-100 text-red-600">
                  <ClockIcon className="h-5 w-5" />
                </div>
                <h3 className="font-display font-semibold text-slate-800">Medical Emergency?</h3>
              </div>
              <p className="mt-3 text-sm text-slate-600">
                Don&apos;t wait for an appointment. Call our 24x7 emergency line
                immediately for urgent care.
              </p>
              <a href="tel:102" className="btn-primary mt-4 w-full !bg-red-600 hover:!bg-red-700">
                Call Emergency: 102
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
