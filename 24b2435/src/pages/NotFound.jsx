import React from "react";
import { Link } from "react-router-dom";
import { HeartIcon, ArrowRightIcon } from "../components/Icons";

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[70vh] flex-col items-center justify-center text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
        <HeartIcon className="h-8 w-8" />
      </div>
      <h1 className="mt-6 font-display text-5xl font-bold text-slate-800">404</h1>
      <p className="mt-2 text-slate-500">This page seems to have taken a different route.</p>
      <Link to="/" className="btn-primary mt-6">
        Back to Home <ArrowRightIcon className="h-4 w-4" />
      </Link>
    </div>
  );
}
