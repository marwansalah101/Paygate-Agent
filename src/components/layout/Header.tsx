"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import { headerNav } from "@/constants/nav";
import { useLenis } from "@/hooks/useLenis";
import { cn } from "@/lib/utils";

const mobileNavContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.04 },
  },
};

const mobileNavItemVariants: Variants = {
  hidden: { opacity: 0, y: -8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] } },
};

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

  // Lock background scroll while the mobile menu is open, and let Escape close it.
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

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
    <>
      {/* Backdrop — sits outside <motion.header> so it isn't clipped by the
          header's own transform (which would otherwise make position:fixed
          descendants relative to the header box instead of the viewport). */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
            onClick={() => setOpen(false)}
            aria-hidden
          />
        )}
      </AnimatePresence>

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
            type="button"
            className={cn(
              "relative grid h-8 w-8 shrink-0 place-items-center rounded-full md:hidden transition-colors duration-500 ease-[var(--ease-out-expo)]",
              scrolledPastHero ? "text-gray-900 active:bg-gray-100" : "text-white active:bg-white/10"
            )}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <AnimatePresence mode="wait" initial={false}>
              {open ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 grid place-items-center"
                >
                  <X size={20} />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 grid place-items-center"
                >
                  <Menu size={20} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Mobile Menu — full-bleed overlay panel, not just a small dropdown */}
        <AnimatePresence>
          {open && (
            <motion.nav
              variants={mobileNavContainerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className={cn(
                "mx-auto mt-3 flex max-h-[calc(100dvh-6.5rem)] w-full flex-col gap-1 overflow-y-auto rounded-3xl border p-3 shadow-2xl backdrop-blur-2xl md:hidden transition-colors duration-500 ease-[var(--ease-out-expo)]",
                scrolledPastHero
                  ? "border-gray-200 bg-white/97 text-gray-900"
                  : "border-white/10 bg-[#0a0e16]/97 text-white"
              )}
            >
              {headerNav.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.label}
                    variants={mobileNavItemVariants}
                    className={cn(
                      "flex flex-col py-2",
                      index < headerNav.length - 1 &&
                        (scrolledPastHero ? "border-b border-gray-200/70" : "border-b border-white/10")
                    )}
                  >
                    <div
                      className={cn(
                        "flex items-center gap-2 px-3 pb-1.5 pt-1 text-[11px] font-semibold uppercase tracking-wider",
                        scrolledPastHero ? "text-gray-500" : "text-gray-400"
                      )}
                    >
                      <Icon size={13} className={scrolledPastHero ? "text-gray-400" : "text-gray-500"} />
                      {item.label}
                    </div>
                    {item.items.map((link) => (
                      <a
                        key={link.href + link.label}
                        href={link.href}
                        onClick={(e) => {
                          e.preventDefault();
                          scrollTo(link.href);
                        }}
                        className={cn(
                          "rounded-xl px-3 py-3 text-[15px] font-medium transition-colors duration-200",
                          scrolledPastHero
                            ? "text-gray-800 hover:bg-gray-100 active:bg-gray-100"
                            : "text-gray-200 hover:bg-white/10 active:bg-white/15"
                        )}
                      >
                        {link.label}
                      </a>
                    ))}
                  </motion.div>
                );
              })}
              <motion.button
                type="button"
                variants={mobileNavItemVariants}
                whileTap={{ scale: 0.97 }}
                onClick={() => scrollTo("#demo")}
                className={cn(
                  "mt-2 w-full rounded-2xl py-3.5 text-sm font-semibold transition-colors duration-500 ease-[var(--ease-out-expo)]",
                  scrolledPastHero ? "bg-black text-white hover:bg-gray-800" : "bg-white text-black hover:bg-gray-200"
                )}
              >
                Book a Demo
              </motion.button>
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
