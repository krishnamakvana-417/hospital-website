import React from "react";
import { PhoneIcon, MapPinIcon, ClockIcon } from "./Icons";

export default function EmergencyBar() {
  return (
    <div className="hidden bg-brand-950 text-slate-200 sm:block">
      <div className="container-page flex items-center justify-between py-2 text-xs">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1.5">
            <PhoneIcon className="h-3.5 w-3.5" /> Emergency: <strong className="text-white">102 / +91-98765-43210</strong>
          </span>
          <span className="flex items-center gap-1.5">
            <MapPinIcon className="h-3.5 w-3.5" /> Powai, Mumbai
          </span>
          <span className="flex items-center gap-1.5">
            <ClockIcon className="h-3.5 w-3.5" /> Emergency open 24x7
          </span>
        </div>
        <span className="font-medium text-teal-400">Trusted by 50,000+ patients</span>
      </div>
    </div>
  );
}
