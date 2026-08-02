"use client";

import { motion } from "framer-motion";

export function ColorBlendSection() {
  const blendVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } },
  };

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={blendVariants}
      className="relative w-full h-[240px]"
      style={{
        background: "linear-gradient(180deg, #1d52ce 0%, #173faa 30%, #0c1e4c 60%, #F5F2EB 100%)",
      }}
    >
      {/* Optional subtle overlay for texture */}
      <div className="absolute inset-0 opacity-30" />
    </motion.section>
  );
}
