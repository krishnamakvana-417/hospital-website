import React from "react";
import Reveal from "../components/Reveal";
import { HeartIcon, ShieldIcon, AwardIcon, UsersIcon, BuildingIcon } from "../components/Icons";

const milestones = [
  { year: "2001", text: "Sanjeevani Hospital founded with 40 beds and a single OPD block." },
  { year: "2008", text: "Launched 24x7 Emergency & Trauma centre with dedicated ambulance fleet." },
  { year: "2014", text: "Crossed 100 specialist doctors; added Cardiac Cath Lab & Neuro ICU." },
  { year: "2020", text: "NABH accreditation achieved for hospital-wide quality standards." },
  { year: "2026", text: "Serving 50,000+ patients a year across 8 specialised departments." },
];

const values = [
  { icon: HeartIcon, title: "Compassion", text: "Every interaction is guided by empathy, dignity, and respect." },
  { icon: ShieldIcon, title: "Integrity", text: "Transparent pricing, honest diagnosis, ethical treatment plans." },
  { icon: AwardIcon, title: "Excellence", text: "Continuous training and modern equipment across departments." },
  { icon: UsersIcon, title: "Accessibility", text: "Affordable care packages and 24x7 emergency access for all." },
];

export default function About() {
  return (
    <div>
      <section className="bg-gradient-to-br from-brand-950 to-brand-700 py-20 text-white">
        <div className="container-page text-center">
          <span className="section-eyebrow bg-white/10 !text-teal-300">About Sanjeevani</span>
          <h1 className="mt-4 font-display text-4xl font-bold sm:text-5xl">
            25 years of healing, one patient at a time
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-slate-200">
            From a 40-bed community hospital to a 300-bed multispeciality centre,
            our mission has stayed the same: exceptional care that patients can trust.
          </p>
        </div>
      </section>

      <section className="container-page grid grid-cols-1 gap-12 py-20 lg:grid-cols-2">
        <Reveal>
          <span className="section-eyebrow">Our Mission</span>
          <h2 className="section-title mt-3">
            Making advanced healthcare accessible, honest, and human
          </h2>
          <p className="mt-4 text-slate-600">
            We combine modern medical technology with a deeply patient-first
            philosophy. Our specialists collaborate across departments to build
            treatment plans around each patient&apos;s life — not just their
            diagnosis.
          </p>
          <p className="mt-4 text-slate-600">
            With a 24x7 emergency and trauma centre, in-house diagnostics, and a
            dedicated care-coordination team, we remove the friction that
            usually comes with hospital visits.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="grid grid-cols-2 gap-5">
            <div className="card text-center">
              <BuildingIcon className="mx-auto h-8 w-8 text-brand-600" />
              <p className="mt-3 text-2xl font-bold text-slate-800">300+</p>
              <p className="text-sm text-slate-500">Hospital Beds</p>
            </div>
            <div className="card text-center">
              <UsersIcon className="mx-auto h-8 w-8 text-brand-600" />
              <p className="mt-3 text-2xl font-bold text-slate-800">120+</p>
              <p className="text-sm text-slate-500">Specialist Doctors</p>
            </div>
            <div className="card text-center">
              <AwardIcon className="mx-auto h-8 w-8 text-brand-600" />
              <p className="mt-3 text-2xl font-bold text-slate-800">NABH</p>
              <p className="text-sm text-slate-500">Accredited Since 2020</p>
            </div>
            <div className="card text-center">
              <HeartIcon className="mx-auto h-8 w-8 text-brand-600" />
              <p className="mt-3 text-2xl font-bold text-slate-800">25 Yrs</p>
              <p className="text-sm text-slate-500">Of Trusted Care</p>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="container-page">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="section-eyebrow">Our Values</span>
            <h2 className="section-title mt-3">What guides every decision we make</h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08} className="card text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                  <v.icon className="h-7 w-7" />
                </div>
                <h3 className="mt-4 font-display font-semibold text-slate-800">{v.title}</h3>
                <p className="mt-2 text-sm text-slate-500">{v.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-20">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="section-eyebrow">Our Journey</span>
          <h2 className="section-title mt-3">Milestones along the way</h2>
        </Reveal>

        <div className="relative mx-auto mt-14 max-w-2xl">
          <div className="absolute left-4 top-0 h-full w-0.5 bg-brand-100 sm:left-1/2" />
          {milestones.map((m, i) => (
            <Reveal key={m.year} delay={i * 0.08} className="relative mb-10 flex flex-col gap-2 pl-12 sm:pl-16">
              <span className="absolute left-2.5 top-1 h-5 w-5 rounded-full border-4 border-white bg-brand-600 shadow sm:left-[calc(50%-10px)]" />
              <p className="font-display text-lg font-bold text-brand-600">{m.year}</p>
              <p className="text-sm text-slate-600">{m.text}</p>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
