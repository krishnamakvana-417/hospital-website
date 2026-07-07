import React from "react";
import { motion } from "framer-motion";
import { PhoneIcon } from "./Icons";

export default function FloatingActions() {
  return (
    <div className="fixed bottom-6 left-6 z-40 flex flex-col gap-3">
      <motion.a
        href="tel:102"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-red-500 text-white shadow-lg"
        aria-label="Emergency call"
      >
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-60" />
        <PhoneIcon className="relative h-6 w-6" />
      </motion.a>
    </div>
  );
}
