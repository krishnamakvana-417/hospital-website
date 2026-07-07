import React from "react";
import { Link } from "react-router-dom";
import { HeartIcon, PhoneIcon, MailIcon, MapPinIcon } from "./Icons";

export default function Footer() {
  return (
    <footer className="bg-brand-950 text-slate-300">
      <div className="container-page grid grid-cols-1 gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link to="/" className="flex items-center gap-2 font-display text-xl font-bold text-white">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500">
              <HeartIcon className="h-5 w-5" />
            </span>
            Sanjeevani Hospital
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-slate-400">
            Multispeciality care built around you — advanced diagnostics, expert doctors, and
            compassionate service, available around the clock.
          </p>
        </div>

        <div>
          <h4 className="mb-4 font-display font-semibold text-white">Quick Links</h4>
          <ul className="space-y-2.5 text-sm">
            {[
              ["/about", "About Us"],
              ["/departments", "Departments"],
              ["/doctors", "Our Doctors"],
              ["/appointments", "Book Appointment"],
              ["/features", "Website Features"],
            ].map(([to, label]) => (
              <li key={to}>
                <Link to={to} className="transition-colors hover:text-white">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-display font-semibold text-white">Departments</h4>
          <ul className="space-y-2.5 text-sm">
            {["Cardiology", "Neurology", "Orthopedics", "Pediatrics", "Emergency & Trauma"].map((d) => (
              <li key={d} className="text-slate-400">
                {d}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-display font-semibold text-white">Contact</h4>
          <ul className="space-y-3 text-sm text-slate-400">
            <li className="flex items-start gap-2">
              <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-teal-400" />
              Sanjeevani Multispeciality Hospital, Powai, Mumbai, Maharashtra 400076
            </li>
            <li className="flex items-center gap-2">
              <PhoneIcon className="h-4 w-4 shrink-0 text-teal-400" /> +91-98765-43210 (24x7 Emergency)
            </li>
            <li className="flex items-center gap-2">
              <MailIcon className="h-4 w-4 shrink-0 text-teal-400" /> care@sanjeevanihospital.in
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-5 text-xs text-slate-500 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} Sanjeevani Hospital. All rights reserved.</p>
          <p>Built by Krishna &middot; Roll No. 24B2435</p>
        </div>
      </div>
    </footer>
  );
}
