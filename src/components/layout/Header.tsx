"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import { headerNav } from "@/constants/nav";
import { useLenis } from "@/hooks/useLenis";
import { cn } from "@/lib/utils";

export function Header() {
  const [open, setOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    const handleScroll = () => {
      // Turn light when scrolled past hero section (~500px)
      setScrolledPastHero(window.scrollY > 480);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setOpen(false);
    setOpenDropdown(null);
    const target = document.querySelector(href);
    if (!target) return;
    if (lenis) {
      lenis.scrollTo(target as HTMLElement, { offset: -24, duration: 1.2 });
    } else {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-3.5 md:px-6"
    >
      {/* Compact Floating Pill Container */}
      <div
        className={cn(
          "mx-auto flex max-w-5xl items-center justify-between rounded-full px-5 py-2 backdrop-blur-xl transition-[background-color,border-color,box-shadow,color] duration-500 ease-[var(--ease-out-expo)]",
          scrolledPastHero
            ? "border border-gray-200/80 bg-white/90 text-gray-900 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.08)]"
            : "border border-white/10 bg-[#060911]/90 text-white shadow-[0_8px_30px_-16px_rgba(0,0,0,0.8)]"
        )}
      >
        {/* Left: Logo */}
        <div className="flex items-center gap-6">
          <motion.a
            href="#"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              "text-xs md:text-sm font-bold uppercase tracking-[0.22em] transition-colors duration-500 ease-[var(--ease-out-expo)] hover:opacity-80",
              scrolledPastHero ? "text-gray-900" : "text-white"
            )}
          >
            PAYGATE AI
          </motion.a>
        </div>

        {/* Center: Dropdown Nav Links */}
        <nav className="hidden items-center gap-1 md:flex">
          {headerNav.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => setOpenDropdown(item.label)}
              onMouseLeave={() =>
                setOpenDropdown((current) => (current === item.label ? null : current))
              }
            >
              <button
                type="button"
                className={cn(
                  "flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium transition-colors duration-500 ease-[var(--ease-out-expo)] cursor-pointer",
                  scrolledPastHero
                    ? "text-gray-700 hover:text-black hover:bg-gray-100/60"
                    : "text-gray-300 hover:text-white hover:bg-white/5"
                )}
                onClick={() =>
                  setOpenDropdown((current) => (current === item.label ? null : item.label))
                }
              >
                {item.label}
                <ChevronDown
                  size={12}
                  className={cn(
                    "transition-[transform,color] duration-300 ease-[var(--ease-out-expo)]",
                    scrolledPastHero ? "text-gray-500" : "text-gray-400",
                    openDropdown === item.label && "rotate-180"
                  )}
                />
              </button>

              <AnimatePresence>
                {openDropdown === item.label && (
                  <motion.div
                    initial={{ opacity: 0, y: -6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.98 }}
                    transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                    className={cn(
                      "absolute left-0 top-full mt-2 min-w-[190px] rounded-2xl p-2 shadow-xl backdrop-blur-xl border transition-colors duration-500 ease-[var(--ease-out-expo)]",
                      scrolledPastHero
                        ? "border-gray-200 bg-white/95 text-gray-800"
                        : "border-white/10 bg-[#090d16]/95 text-gray-200"
                    )}
                  >
                    {item.items.map((link) => (
                      <motion.a
                        key={link.href + link.label}
                        href={link.href}
                        whileHover={{ x: 3 }}
                        onClick={(e) => {
                          e.preventDefault();
                          scrollTo(link.href);
                        }}
                        className={cn(
                          "block rounded-lg px-3 py-1.5 text-xs transition-colors duration-500 ease-[var(--ease-out-expo)]",
                          scrolledPastHero
                            ? "text-gray-700 hover:bg-gray-100 hover:text-black"
                            : "text-gray-300 hover:bg-white/10 hover:text-white"
                        )}
                      >
                        {link.label}
                      </motion.a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        {/* Right: CTA Button */}
        <div className="hidden items-center gap-2 md:flex">
          <motion.button
            type="button"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => scrollTo("#demo")}
            className={cn(
              "rounded-full px-4 py-1.5 text-xs font-semibold cursor-pointer transition-[background-color,color] duration-500 ease-[var(--ease-out-expo)]",
              scrolledPastHero
                ? "bg-black text-white hover:bg-gray-800 shadow-sm"
                : "bg-white text-black hover:bg-gray-200 shadow-sm"
            )}
          >
            Book a Demo
          </motion.button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className={cn(
            "md:hidden p-1 transition-colors duration-500 ease-[var(--ease-out-expo)]",
            scrolledPastHero ? "text-gray-900" : "text-white"
          )}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "mx-auto mt-2 flex max-w-4xl flex-col gap-1 rounded-2xl p-3 shadow-xl backdrop-blur-xl border md:hidden max-h-[75vh] overflow-y-auto transition-colors duration-500 ease-[var(--ease-out-expo)]",
              scrolledPastHero
                ? "border-gray-200 bg-white/95 text-gray-900"
                : "border-white/10 bg-[#0a0e16]/95 text-white"
            )}
          >
            {headerNav.map((item) => (
              <div key={item.label} className="flex flex-col">
                <span
                  className={cn(
                    "px-3 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-wider transition-colors duration-500 ease-[var(--ease-out-expo)]",
                    scrolledPastHero ? "text-gray-500" : "text-gray-400"
                  )}
                >
                  {item.label}
                </span>
                {item.items.map((link) => (
                  <a
                    key={link.href + link.label}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(link.href);
                    }}
                    className={cn(
                      "rounded-lg px-3 py-1.5 text-xs font-medium transition-colors duration-500 ease-[var(--ease-out-expo)]",
                      scrolledPastHero
                        ? "text-gray-800 hover:bg-gray-100"
                        : "text-gray-200 hover:bg-white/5"
                    )}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            ))}
            <button
              type="button"
              onClick={() => scrollTo("#demo")}
              className={cn(
                "mt-2 w-full rounded-xl py-2 text-xs font-semibold transition-colors duration-500 ease-[var(--ease-out-expo)]",
                scrolledPastHero ? "bg-black text-white hover:bg-gray-800" : "bg-white text-black hover:bg-gray-200"
              )}
            >
              Book a Demo
            </button>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
