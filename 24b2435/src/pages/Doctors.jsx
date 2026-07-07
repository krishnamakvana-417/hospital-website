import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api/client";
import Reveal from "../components/Reveal";
import { SearchIcon, StarIcon, ClockIcon } from "../components/Icons";

export default function Doctors() {
  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("all");

  useEffect(() => {
    api.getDepartments().then(setDepartments).catch(() => {});
  }, []);

  useEffect(() => {
    setLoading(true);
    const params = {};
    if (deptFilter !== "all") params.department_id = deptFilter;
    if (search.trim()) params.search = search.trim();

    const timeout = setTimeout(() => {
      api
        .getDoctors(params)
        .then(setDoctors)
        .catch(() => {})
        .finally(() => setLoading(false));
    }, 250);

    return () => clearTimeout(timeout);
  }, [search, deptFilter]);

  return (
    <div>
      <section className="bg-gradient-to-br from-brand-950 to-brand-700 py-16 text-white">
        <div className="container-page text-center">
          <span className="section-eyebrow bg-white/10 !text-teal-300">Our Doctors</span>
          <h1 className="mt-4 font-display text-4xl font-bold sm:text-5xl">
            Meet Our Expert Specialists
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-slate-200">
            120+ senior consultants across 8 departments, ready to help.
          </p>
        </div>
      </section>

      <section className="container-page py-12">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-sm">
            <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by doctor or department..."
              className="input-field !pl-10"
            />
          </div>
          <select
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
            className="input-field sm:max-w-xs"
          >
            <option value="all">All Departments</option>
            {departments.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {loading &&
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="card h-64 animate-pulse bg-slate-50" />
            ))}

          {!loading && doctors.length === 0 && (
            <p className="col-span-full py-10 text-center text-slate-500">
              No doctors match your search. Try a different name or department.
            </p>
          )}

          {!loading &&
            doctors.map((doc, i) => (
              <Reveal key={doc.id} delay={i * 0.04} className="card flex flex-col items-center text-center">
                <img
                  src={doc.photo_url}
                  alt={doc.name}
                  className="h-24 w-24 rounded-full object-cover bg-brand-50"
                />
                <h3 className="mt-4 font-display font-semibold text-slate-800">{doc.name}</h3>
                <p className="text-sm text-brand-600">{doc.department_name}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {doc.qualification} &middot; {doc.experience_years} yrs experience
                </p>
                <div className="mt-3 flex items-center gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1 text-amber-500">
                    <StarIcon className="h-3.5 w-3.5" /> {doc.rating}
                  </span>
                  <span className="flex items-center gap-1">
                    <ClockIcon className="h-3.5 w-3.5" /> {doc.timing}
                  </span>
                </div>
                <Link to={`/appointments?doctorId=${doc.id}`} className="btn-primary mt-5 w-full !py-2.5 text-sm">
                  Book Appointment
                </Link>
              </Reveal>
            ))}
        </div>
      </section>
    </div>
  );
}
