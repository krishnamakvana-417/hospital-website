import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { api } from "../api/client";
import Reveal from "../components/Reveal";
import {
  departmentIcons,
  HeartIcon,
  UsersIcon,
  AwardIcon,
  BuildingIcon,
  StarIcon,
  ArrowRightIcon,
  CalendarIcon,
  ShieldIcon,
  ClockIcon,
} from "../components/Icons";

const stats = [
  { icon: UsersIcon, value: "50,000+", label: "Patients Treated" },
  { icon: AwardIcon, value: "120+", label: "Expert Doctors" },
  { icon: BuildingIcon, value: "8", label: "Specialised Departments" },
  { icon: ClockIcon, value: "24x7", label: "Emergency Care" },
];

const testimonials = [
  {
    name: "Ramesh Deshpande",
    text: "The cardiology team acted within minutes of my father's admission. The care and follow-up were outstanding.",
    rating: 5,
  },
  {
    name: "Sunita Agarwal",
    text: "Booking an appointment online took less than two minutes and the doctor was running exactly on time.",
    rating: 5,
  },
  {
    name: "Farhan Sheikh",
    text: "Pediatric ward staff made my daughter feel comfortable throughout her treatment. Truly grateful.",
    rating: 4,
  },
];

const whyUs = [
  {
    icon: ShieldIcon,
    title: "NABH Accredited",
    text: "Nationally accredited quality and patient-safety standards across every department.",
  },
  {
    icon: CalendarIcon,
    title: "Instant Booking",
    text: "Book an appointment with your preferred doctor in under a minute, anytime.",
  },
  {
    icon: AwardIcon,
    title: "Expert Specialists",
    text: "120+ senior consultants across 8 specialities with decades of combined experience.",
  },
  {
    icon: HeartIcon,
    title: "Patient-First Care",
    text: "Every protocol is designed around comfort, transparency, and recovery outcomes.",
  },
];

function AnimatedCounter({ value }) {
  return <span>{value}</span>;
}

export default function Home() {
  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.getDepartments(), api.getDoctors()])
      .then(([deps, docs]) => {
        setDepartments(deps.slice(0, 8));
        setDoctors(docs.slice(0, 4));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-950 via-brand-800 to-brand-600">
        <div className="pointer-events-none absolute inset-0 opacity-20">
          <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-teal-400 blur-3xl" />
          <div className="absolute -right-10 top-40 h-96 w-96 rounded-full bg-brand-300 blur-3xl" />
        </div>

        <div className="container-page relative grid grid-cols-1 items-center gap-12 py-16 sm:py-24 lg:grid-cols-2 lg:py-28">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-teal-300 ring-1 ring-white/20">
              <HeartIcon className="h-4 w-4" /> Trusted Multispeciality Care
            </span>
            <h1 className="mt-6 font-display text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              Compassionate care,
              <br />
              <span className="text-teal-300">advanced medicine.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-slate-200">
              Sanjeevani Hospital brings together expert specialists, modern
              diagnostics, and 24x7 emergency response — so your family gets
              the right care, right when it matters.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/appointments" className="btn-primary bg-teal-500 hover:bg-teal-600">
                Book an Appointment <ArrowRightIcon className="h-4 w-4" />
              </Link>
              <Link to="/doctors" className="btn-secondary !border-white/40 !text-white hover:!bg-white/10">
                Find a Doctor
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="flex items-center gap-2 text-2xl font-bold text-white">
                    <s.icon className="h-5 w-5 text-teal-300" />
                    <AnimatedCounter value={s.value} />
                  </div>
                  <p className="mt-1 text-xs text-slate-300">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="rounded-3xl bg-white/10 p-6 backdrop-blur-md ring-1 ring-white/20">
              <div className="rounded-2xl bg-white p-6 shadow-2xl">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 text-teal-600">
                    <CalendarIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">Next Available Slot</p>
                    <p className="text-sm text-slate-500">Cardiology &middot; Dr. Aditi Sharma</p>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {["10:00 AM", "11:30 AM", "2:00 PM"].map((t, i) => (
                    <div
                      key={t}
                      className={`rounded-lg border py-2 text-center text-sm font-medium ${
                        i === 1
                          ? "border-teal-500 bg-teal-50 text-teal-700"
                          : "border-slate-200 text-slate-600"
                      }`}
                    >
                      {t}
                    </div>
                  ))}
                </div>
                <Link to="/appointments" className="btn-primary mt-5 w-full !py-2.5">
                  Confirm Booking
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="container-page py-20">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="section-eyebrow">Why Choose Us</span>
          <h2 className="section-title mt-3">Care built around your peace of mind</h2>
        </Reveal>
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {whyUs.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08} className="card text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                <item.icon className="h-7 w-7" />
              </div>
              <h3 className="mt-4 font-display font-semibold text-slate-800">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-500">{item.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* DEPARTMENTS */}
      <section className="bg-slate-50 py-20">
        <div className="container-page">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="section-eyebrow">Our Departments</span>
            <h2 className="section-title mt-3">Specialised care under one roof</h2>
          </Reveal>

          <div className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {(loading ? Array.from({ length: 8 }) : departments).map((d, i) => {
              const Icon = d ? departmentIcons[d.icon] || HeartIcon : HeartIcon;
              return (
                <Reveal key={d ? d.id : i} delay={i * 0.05}>
                  <Link
                    to="/departments"
                    className="card flex h-full flex-col items-center gap-3 text-center"
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-50 text-teal-600">
                      <Icon className="h-7 w-7" />
                    </div>
                    <h3 className="font-display font-semibold text-slate-800">
                      {d ? d.name : "Loading..."}
                    </h3>
                  </Link>
                </Reveal>
              );
            })}
          </div>
          <div className="mt-10 text-center">
            <Link to="/departments" className="btn-secondary">
              View All Departments <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* TOP DOCTORS */}
      <section className="container-page py-20">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="section-eyebrow">Meet Our Specialists</span>
          <h2 className="section-title mt-3">Doctors our patients trust most</h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {(loading ? Array.from({ length: 4 }) : doctors).map((doc, i) => (
            <Reveal key={doc ? doc.id : i} delay={i * 0.08} className="card text-center">
              {doc ? (
                <>
                  <img
                    src={doc.photo_url}
                    alt={doc.name}
                    className="mx-auto h-24 w-24 rounded-full object-cover bg-brand-50"
                  />
                  <h3 className="mt-4 font-display font-semibold text-slate-800">{doc.name}</h3>
                  <p className="text-sm text-brand-600">{doc.department_name}</p>
                  <div className="mt-2 flex items-center justify-center gap-1 text-sm text-amber-500">
                    <StarIcon className="h-4 w-4" /> {doc.rating}
                  </div>
                  <Link
                    to="/doctors"
                    className="mt-4 inline-block text-sm font-semibold text-brand-600 hover:underline"
                  >
                    View Profile
                  </Link>
                </>
              ) : (
                <div className="h-52 animate-pulse rounded-xl bg-slate-100" />
              )}
            </Reveal>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-brand-950 py-20">
        <div className="container-page">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="section-eyebrow bg-white/10 !text-teal-300">Patient Stories</span>
            <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
              What our patients say
            </h2>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal
                key={t.name}
                delay={i * 0.1}
                className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10"
              >
                <div className="flex gap-1 text-amber-400">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <StarIcon key={idx} className={`h-4 w-4 ${idx < t.rating ? "" : "opacity-30"}`} />
                  ))}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-slate-300">&ldquo;{t.text}&rdquo;</p>
                <p className="mt-4 font-display font-semibold text-white">{t.name}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-page py-20">
        <Reveal className="flex flex-col items-center justify-between gap-6 rounded-3xl bg-gradient-to-r from-teal-600 to-brand-600 px-8 py-14 text-center shadow-cardHover sm:flex-row sm:text-left">
          <div>
            <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
              Ready to schedule your visit?
            </h2>
            <p className="mt-2 text-teal-50">
              Our care coordinators will confirm your slot within the hour.
            </p>
          </div>
          <Link to="/appointments" className="btn-secondary shrink-0 !border-white !bg-white !text-brand-700">
            Book Appointment <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
