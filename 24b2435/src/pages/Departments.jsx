import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { api } from "../api/client";
import Reveal from "../components/Reveal";
import { departmentIcons, HeartIcon, ArrowRightIcon, StarIcon, CloseIcon, ClockIcon } from "../components/Icons";

export default function Departments() {
  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [active, setActive] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.getDepartments(), api.getDoctors()])
      .then(([deps, docs]) => {
        setDepartments(deps);
        setDoctors(docs);
      })
      .finally(() => setLoading(false));
  }, []);

  const activeDoctors = active ? doctors.filter((d) => d.department_id === active.id) : [];

  return (
    <div>
      <section className="bg-gradient-to-br from-brand-950 to-brand-700 py-16 text-white">
        <div className="container-page text-center">
          <span className="section-eyebrow bg-white/10 !text-teal-300">Departments</span>
          <h1 className="mt-4 font-display text-4xl font-bold sm:text-5xl">
            Specialised Care, Under One Roof
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-slate-200">
            Explore our 8 clinical departments. Tap a department to see its
            specialists and book directly.
          </p>
        </div>
      </section>

      <section className="container-page py-16">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {(loading ? Array.from({ length: 8 }) : departments).map((d, i) => {
            const Icon = d ? departmentIcons[d.icon] || HeartIcon : HeartIcon;
            const count = d ? doctors.filter((doc) => doc.department_id === d.id).length : 0;
            return (
              <Reveal key={d ? d.id : i} delay={i * 0.05}>
                <button
                  onClick={() => d && setActive(d)}
                  className="card flex w-full flex-col items-start gap-3 text-left"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-50 text-teal-600">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-slate-800">
                    {d ? d.name : "Loading..."}
                  </h3>
                  <p className="text-sm text-slate-500">{d ? d.description : ""}</p>
                  <span className="mt-2 flex items-center gap-1 text-sm font-semibold text-brand-600">
                    {count} Doctors <ArrowRightIcon className="h-4 w-4" />
                  </span>
                </button>
              </Reveal>
            );
          })}
        </div>
      </section>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/60 p-4"
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 sm:p-8"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="section-eyebrow">{active.name}</span>
                  <h3 className="mt-2 font-display text-2xl font-bold text-slate-800">
                    Our {active.name} Specialists
                  </h3>
                </div>
                <button
                  onClick={() => setActive(null)}
                  className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                  aria-label="Close"
                >
                  <CloseIcon className="h-5 w-5" />
                </button>
              </div>
              <p className="mt-2 text-sm text-slate-500">{active.description}</p>

              <div className="mt-6 space-y-4">
                {activeDoctors.length === 0 && (
                  <p className="text-sm text-slate-500">No doctors listed currently.</p>
                )}
                {activeDoctors.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex flex-col items-start gap-4 rounded-xl border border-slate-100 p-4 sm:flex-row sm:items-center"
                  >
                    <img
                      src={doc.photo_url}
                      alt={doc.name}
                      className="h-16 w-16 rounded-full object-cover bg-brand-50"
                    />
                    <div className="flex-1">
                      <p className="font-display font-semibold text-slate-800">{doc.name}</p>
                      <p className="text-sm text-slate-500">{doc.qualification} &middot; {doc.experience_years} yrs experience</p>
                      <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                        <span className="flex items-center gap-1 text-amber-500">
                          <StarIcon className="h-3.5 w-3.5" /> {doc.rating}
                        </span>
                        <span className="flex items-center gap-1">
                          <ClockIcon className="h-3.5 w-3.5" /> {doc.timing}
                        </span>
                      </div>
                    </div>
                    <Link
                      to={`/appointments?doctorId=${doc.id}`}
                      className="btn-primary !px-4 !py-2 text-sm"
                      onClick={() => setActive(null)}
                    >
                      Book
                    </Link>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
