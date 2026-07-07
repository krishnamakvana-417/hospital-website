import React from "react";

const base = (props) => ({
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  ...props,
});

export const HeartIcon = (p) => (
  <svg {...base(p)}>
    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 1 0-7.8 7.8l1 1L12 21.2l7.8-7.8 1-1a5.5 5.5 0 0 0 0-7.8Z" />
  </svg>
);

export const BrainIcon = (p) => (
  <svg {...base(p)}>
    <path d="M9.5 2a3.5 3.5 0 0 0-3.5 3.5V6a3 3 0 0 0-2 5 3 3 0 0 0 1 5.5A3.5 3.5 0 0 0 8.5 20H9a1 1 0 0 0 1-1V5a3 3 0 0 0-.5-3Z" />
    <path d="M14.5 2A3.5 3.5 0 0 1 18 5.5V6a3 3 0 0 1 2 5 3 3 0 0 1-1 5.5A3.5 3.5 0 0 1 15.5 20H15a1 1 0 0 1-1-1V5a3 3 0 0 1 .5-3Z" />
  </svg>
);

export const BoneIcon = (p) => (
  <svg {...base(p)}>
    <path d="M17 6a2.5 2.5 0 1 0-3.9 2.1L6.1 15A2.5 2.5 0 1 0 4 19a2.5 2.5 0 0 0 3.9-2.1L15 10a2.5 2.5 0 0 0 2-4Z" />
  </svg>
);

export const BabyIcon = (p) => (
  <svg {...base(p)}>
    <circle cx="12" cy="7" r="4" />
    <path d="M6 21v-2a6 6 0 0 1 12 0v2" />
  </svg>
);

export const SkinIcon = (p) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="9" />
    <circle cx="9" cy="10" r="0.5" fill="currentColor" />
    <circle cx="15" cy="9" r="0.5" fill="currentColor" />
    <circle cx="13" cy="14" r="0.5" fill="currentColor" />
  </svg>
);

export const EarIcon = (p) => (
  <svg {...base(p)}>
    <path d="M17 4a5 5 0 0 0-5 5c0 2 1 2.5 1 4.5A3.5 3.5 0 0 1 9.5 17" />
    <path d="M12 4a8 8 0 0 0-8 8 8 8 0 0 0 6 7.7" />
  </svg>
);

export const StethoscopeIcon = (p) => (
  <svg {...base(p)}>
    <path d="M4.8 2v6a4.2 4.2 0 0 0 8.4 0V2" />
    <path d="M9 12v2a6 6 0 0 0 12 0v-1.5" />
    <circle cx="21.5" cy="10.5" r="1.5" />
  </svg>
);

export const AmbulanceIcon = (p) => (
  <svg {...base(p)}>
    <path d="M2 17h1a2 2 0 0 0 4 0h6a2 2 0 0 0 4 0h1v-5l-3-4h-4V6H4a2 2 0 0 0-2 2v9Z" />
    <path d="M14 10h4l2 3" />
    <path d="M8 8v4M6 10h4" />
  </svg>
);

export const departmentIcons = {
  heart: HeartIcon,
  brain: BrainIcon,
  bone: BoneIcon,
  baby: BabyIcon,
  skin: SkinIcon,
  ear: EarIcon,
  stethoscope: StethoscopeIcon,
  ambulance: AmbulanceIcon,
};

export const PhoneIcon = (p) => (
  <svg {...base(p)}>
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .3 2 .7 3a2 2 0 0 1-.4 2.1L8 10.3a16 16 0 0 0 5.7 5.7l1.5-1.4a2 2 0 0 1 2.1-.4c1 .4 2 .6 3 .7a2 2 0 0 1 1.7 2.1Z" />
  </svg>
);

export const MailIcon = (p) => (
  <svg {...base(p)}>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 6-10 7L2 6" />
  </svg>
);

export const MapPinIcon = (p) => (
  <svg {...base(p)}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export const ClockIcon = (p) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 3" />
  </svg>
);

export const StarIcon = (p) => (
  <svg {...base({ ...p, fill: p.fill || "currentColor", stroke: "none" })}>
    <path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.9L12 17.8 5.8 21l1.2-6.9-5-4.9 6.9-1L12 2Z" />
  </svg>
);

export const MenuIcon = (p) => (
  <svg {...base(p)}>
    <path d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

export const CloseIcon = (p) => (
  <svg {...base(p)}>
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);

export const SearchIcon = (p) => (
  <svg {...base(p)}>
    <circle cx="11" cy="11" r="7" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

export const CheckCircleIcon = (p) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="9" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export const ShieldIcon = (p) => (
  <svg {...base(p)}>
    <path d="M12 2 4 5v6c0 5 3.4 9 8 11 4.6-2 8-6 8-11V5l-8-3Z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export const UsersIcon = (p) => (
  <svg {...base(p)}>
    <circle cx="9" cy="8" r="3.2" />
    <path d="M3 20v-1a5 5 0 0 1 5-5h2a5 5 0 0 1 5 5v1" />
    <circle cx="17.5" cy="9" r="2.6" />
    <path d="M16 13.5c2.6.3 4.5 2 4.5 4.5v2" />
  </svg>
);

export const AwardIcon = (p) => (
  <svg {...base(p)}>
    <circle cx="12" cy="8" r="6" />
    <path d="m9 13.5-1.5 7L12 18l4.5 2.5-1.5-7" />
  </svg>
);

export const BuildingIcon = (p) => (
  <svg {...base(p)}>
    <rect x="4" y="3" width="16" height="18" rx="1" />
    <path d="M9 8h1M14 8h1M9 12h1M14 12h1M9 16h1M14 16h1" />
  </svg>
);

export const CalendarIcon = (p) => (
  <svg {...base(p)}>
    <rect x="3" y="4" width="18" height="17" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18" />
  </svg>
);

export const ArrowRightIcon = (p) => (
  <svg {...base(p)}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const ChevronDownIcon = (p) => (
  <svg {...base(p)}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);
