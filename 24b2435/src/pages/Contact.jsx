import React, { useState } from "react";
import { api } from "../api/client";
import { useToast } from "../components/Toast";
import Reveal from "../components/Reveal";
import { PhoneIcon, MailIcon, MapPinIcon, ClockIcon } from "../components/Icons";

export default function Contact() {
  const { showToast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const update = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    setErrors((er) => ({ ...er, [field]: undefined }));
  };

  const validate = () => {
    const er = {};
    if (!form.name.trim()) er.name = "Please enter your name";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) er.email = "Enter a valid email address";
    if (!form.subject.trim()) er.subject = "Please add a subject";
    if (form.message.trim().length < 10) er.message = "Message should be at least 10 characters";
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      await api.sendContactMessage(form);
      showToast("Message sent! We'll get back to you shortly.");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      showToast(err?.response?.data?.error || "Could not send message. Try again.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <section className="bg-gradient-to-br from-brand-950 to-brand-700 py-16 text-white">
        <div className="container-page text-center">
          <span className="section-eyebrow bg-white/10 !text-teal-300">Contact Us</span>
          <h1 className="mt-4 font-display text-4xl font-bold sm:text-5xl">We&apos;re Here to Help</h1>
          <p className="mx-auto mt-4 max-w-xl text-slate-200">
            Questions about a visit, billing, or reports? Reach out anytime.
          </p>
        </div>
      </section>

      <section className="container-page py-16">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 lg:grid-cols-[1fr,1.3fr]">
          <Reveal className="space-y-5">
            <div className="card flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <MapPinIcon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-slate-800">Address</h3>
                <p className="mt-1 text-sm text-slate-500">
                  Sanjeevani Multispeciality Hospital, Powai, Mumbai, Maharashtra 400076
                </p>
              </div>
            </div>
            <div className="card flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <PhoneIcon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-slate-800">Phone</h3>
                <p className="mt-1 text-sm text-slate-500">+91-98765-43210 (Reception)</p>
                <p className="text-sm text-slate-500">102 (24x7 Emergency)</p>
              </div>
            </div>
            <div className="card flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <MailIcon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-slate-800">Email</h3>
                <p className="mt-1 text-sm text-slate-500">care@sanjeevanihospital.in</p>
              </div>
            </div>
            <div className="card flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <ClockIcon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-slate-800">OPD Hours</h3>
                <p className="mt-1 text-sm text-slate-500">Mon - Sat: 8:00 AM - 8:00 PM</p>
                <p className="text-sm text-slate-500">Emergency: Open 24x7</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="card">
            <h3 className="font-display text-xl font-semibold text-slate-800">Send us a message</h3>
            <form onSubmit={handleSubmit} className="mt-5 space-y-5">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className="label-field">Your Name *</label>
                  <input value={form.name} onChange={update("name")} className="input-field" placeholder="Full name" />
                  {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                </div>
                <div>
                  <label className="label-field">Email *</label>
                  <input value={form.email} onChange={update("email")} className="input-field" placeholder="you@email.com" />
                  {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                </div>
              </div>
              <div>
                <label className="label-field">Subject *</label>
                <input value={form.subject} onChange={update("subject")} className="input-field" placeholder="How can we help?" />
                {errors.subject && <p className="mt-1 text-xs text-red-500">{errors.subject}</p>}
              </div>
              <div>
                <label className="label-field">Message *</label>
                <textarea
                  value={form.message}
                  onChange={update("message")}
                  rows={5}
                  className="input-field resize-none"
                  placeholder="Tell us more..."
                />
                {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
              </div>
              <button type="submit" disabled={submitting} className="btn-primary w-full disabled:opacity-60">
                {submitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="mx-auto mt-12 max-w-5xl overflow-hidden rounded-2xl border border-slate-100 shadow-card">
          <iframe
            title="Hospital Location Map"
            src="https://www.google.com/maps?q=Powai,Mumbai,Maharashtra&output=embed"
            width="100%"
            height="320"
            style={{ border: 0 }}
            loading="lazy"
          />
        </Reveal>
      </section>
    </div>
  );
}
