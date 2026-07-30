"use client";

import { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, CheckCircle2, ShieldCheck, Sparkles, Zap } from "lucide-react";

export function HeroGatewayDeck() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Mouse tilt physics for 3D deck
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [10, -10]), { stiffness: 200, damping: 25 });
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-10, 10]), { stiffness: 200, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const transactions = [
    {
      id: "Quote #103",
      client: "TechNova Corp",
      amount: "$45,200 USD",
      status: "Approved",
      interest: "Hot 🔥 (18 views)",
      badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    },
    {
      id: "Quote #105",
      client: "Nexora Digital",
      amount: "$18,900 USD",
      status: "Approved",
      interest: "Hot 🔥 (9 views)",
      badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    },
    {
      id: "Work Order #23",
      client: "CloudBridge Solutions",
      amount: "$24,500 USD",
      status: "In Progress",
      interest: "Warm ⚡ (60% Done)",
      badge: "bg-blue-500/10 text-blue-400 border-blue-500/30",
    },
  ];

  return (
    <div
      className="relative w-full max-w-5xl mx-auto mt-12 md:mt-16 perspective-[1200px]"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Outer Glow Halo */}
      <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-blue-600/30 via-indigo-500/20 to-cyan-400/30 blur-2xl opacity-75 animate-pulse" />

      {/* Main 3D Floating Glass Deck Container */}
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative rounded-2xl border border-white/15 bg-[#090d19]/85 backdrop-blur-2xl p-6 md:p-8 shadow-2xl shadow-blue-950/60 overflow-hidden"
      >
        {/* Top Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400">
              <Zap className="h-4 w-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-white tracking-wide">PAYGATE AI ENGINE</span>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-mono text-emerald-400 border border-emerald-500/20">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                  LIVE ROUTING
                </span>
              </div>
              <p className="text-xs text-gray-400 font-mono">Real-time payment conversion & AI sales proposal engine</p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs text-gray-300 font-mono">
            <span className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg">
              <ShieldCheck className="h-3.5 w-3.5 text-blue-400" />
              PCI-DSS Level 1
            </span>
            <span className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg">
              <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
              99.99% Uptime SLA
            </span>
          </div>
        </div>

        {/* Real-time Gateway Transaction Feed Grid */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {transactions.map((tx, idx) => (
            <motion.div
              key={tx.id}
              whileHover={{ y: -6, scale: 1.02 }}
              onHoverStart={() => setHoveredIndex(idx)}
              onHoverEnd={() => setHoveredIndex(null)}
              className={`relative rounded-xl border p-4 transition-all duration-300 ${
                hoveredIndex === idx
                  ? "border-blue-400/50 bg-blue-600/10 shadow-lg shadow-blue-500/10"
                  : "border-white/10 bg-white/[0.03] hover:border-white/20"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-medium text-gray-400">{tx.id}</span>
                <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full border ${tx.badge}`}>
                  {tx.status}
                </span>
              </div>

              <div className="mt-3">
                <h4 className="text-base font-bold text-white tracking-tight">{tx.client}</h4>
                <p className="text-lg font-extrabold text-blue-400 mt-0.5">{tx.amount}</p>
              </div>

              <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-gray-400">
                <span className="font-mono">{tx.interest}</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-gray-400" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Interactive Simulation Bar */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10 text-xs">
          <div className="flex items-center gap-2 text-gray-300 font-mono">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            <span>Merchant Onboarded in <strong>2m 45s</strong></span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-gray-400 font-mono">Simulate AI Gateway Conversion:</span>
            <span className="font-mono font-bold text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-md border border-cyan-500/30">
              98.4% Success Rate
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
