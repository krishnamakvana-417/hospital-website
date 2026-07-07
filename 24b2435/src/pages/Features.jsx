import React from "react";
import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";
import {
  CalendarIcon,
  SearchIcon,
  ShieldIcon,
  UsersIcon,
  StethoscopeIcon,
  MailIcon,
  ClockIcon,
  ArrowRightIcon,
  CheckCircleIcon,
} from "../components/Icons";

const patientFeatures = [
  {
    icon: CalendarIcon,
    title: "Live Appointment Booking",
    text: "Book a slot with any doctor in seconds — form validation, real-time doctor filtering by department, and instant confirmation with a reference ID.",
  },
  {
    icon: SearchIcon,
    title: "Doctor Search & Filter",
    text: "Search 120+ doctors by name or department, with debounced live search calling the backend REST API as you type.",
  },
  {
    icon: StethoscopeIcon,
    title: "Department Explorer",
    text: "Browse 8 departments; tap any card to open a modal listing every doctor in that speciality with ratings and timings.",
  },
  {
    icon: MailIcon,
    title: "Contact & Query Form",
    text: "A validated contact form persists messages to the backend database so the hospital team can respond directly.",
  },
  {
    icon: ClockIcon,
    title: "24x7 Emergency Access",
    text: "A pulsing floating emergency-call button and a sticky top bar keep emergency contact one tap away on every page.",
  },
  {
    icon: UsersIcon,
    title: "Fully Responsive UI",
    text: "Built mobile-first with a collapsible nav, adaptive grids, and touch-friendly controls across every breakpoint.",
  },
];

const adminFeatures = [
  {
    icon: ShieldIcon,
    title: "JWT-Secured Admin Login",
    text: "Admin credentials are hashed (Werkzeug) and every dashboard request is authorized via a signed JWT token.",
  },
  {
    icon: CalendarIcon,
    title: "Appointment Management",
    text: "View every booking in real time, update its status (Pending / Confirmed / Completed / Cancelled), or remove it.",
  },
  {
    icon: MailIcon,
    title: "Message Inbox",
    text: "All contact-form submissions are visible in the dashboard so the hospital never misses a patient query.",
  },
];

const techStack = [
  { label: "Frontend", value: "React 18 + Vite, React Router, Tailwind CSS, Framer Motion, Axios" },
  { label: "Backend", value: "Python Flask REST API, JWT authentication, Flask-CORS" },
  { label: "Database", value: "SQLite (departments, doctors, appointments, contact messages, admin)" },
  { label: "Deployment", value: "Frontend on Vercel/Netlify, backend on Render/Railway" },
];

export default function Features() {
  return (
    <div>
      <section className="bg-gradient-to-br from-brand-950 to-brand-700 py-16 text-white">
        <div className="container-page text-center">
          <span className="section-eyebrow bg-white/10 !text-teal-300">Website Features</span>
          <h1 className="mt-4 font-display text-4xl font-bold sm:text-5xl">
            Everything Built Into This Site
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-slate-200">
            A quick tour of the functionality — useful if you're reviewing this
            project or just curious what's under the hood.
          </p>
        </div>
      </section>

      <section className="container-page py-16">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="section-eyebrow">For Patients</span>
          <h2 className="section-title mt-3">Designed around a smooth patient journey</h2>
        </Reveal>
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {patientFeatures.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.06} className="card">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <f.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-display font-semibold text-slate-800">{f.title}</h3>
              <p className="mt-2 text-sm text-slate-500">{f.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="container-page">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="section-eyebrow">For Hospital Staff</span>
            <h2 className="section-title mt-3">A simple admin panel behind the scenes</h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {adminFeatures.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.08} className="card">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-display font-semibold text-slate-800">{f.title}</h3>
                <p className="mt-2 text-sm text-slate-500">{f.text}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2} className="mt-8 text-center">
            <Link to="/admin/login" className="btn-secondary">
              Try Admin Login <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="container-page py-16">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="section-eyebrow">Tech Stack</span>
          <h2 className="section-title mt-3">How it's built</h2>
        </Reveal>
        <div className="mx-auto mt-10 max-w-3xl divide-y divide-slate-100 rounded-2xl border border-slate-100 shadow-card">
          {techStack.map((t, i) => (
            <Reveal key={t.label} delay={i * 0.05} className="flex flex-col gap-1 p-5 sm:flex-row sm:items-center sm:gap-6">
              <div className="flex items-center gap-2 sm:w-40 sm:shrink-0">
                <CheckCircleIcon className="h-5 w-5 text-teal-600" />
                <span className="font-display font-semibold text-slate-800">{t.label}</span>
              </div>
              <p className="text-sm text-slate-500">{t.value}</p>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
