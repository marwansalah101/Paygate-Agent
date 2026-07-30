"use client";

import { motion } from "framer-motion";

export function HeroPartnerMarquee() {
  const partners = [
    "TechNova Corp",
    "CloudBridge",
    "DataSync Labs",
    "Nexora Digital",
    "OxoHotel",
    "Biotronitech",
    "Vertix Software",
    "InnoStack SAS",
  ];

  return (
    <div className="relative w-full overflow-hidden py-10 mt-12 border-t border-b border-white/10 bg-black/20 backdrop-blur-sm">
      {/* Gradient Fades for Left and Right edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-[#040816] to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-[#040816] to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 mb-4 text-center">
        <p className="text-xs font-mono tracking-widest text-gray-400 uppercase">
          Trusted by high-growth SaaS, FinTech & Enterprise leaders globally
        </p>
      </div>

      <div className="flex w-full overflow-hidden">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 25, ease: "linear", repeat: Infinity }}
          className="flex items-center gap-12 whitespace-nowrap"
        >
          {[...partners, ...partners].map((partner, index) => (
            <div
              key={index}
              className="flex items-center gap-3 text-sm md:text-base font-bold font-mono text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer px-4 py-2 rounded-lg hover:bg-white/5"
            >
              <span className="h-2 w-2 rounded-full bg-blue-500/80" />
              <span>{partner}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
