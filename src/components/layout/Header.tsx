"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, Globe, Menu, X } from "lucide-react";
import { headerNav } from "@/constants/nav";
import { useLenis } from "@/hooks/useLenis";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function Header() {
  const [open, setOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const lenis = useLenis();

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
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/10 bg-[#060911]/90 px-6 py-2.5 shadow-[0_8px_30px_-16px_rgba(0,0,0,0.8)] backdrop-blur-xl">
        {/* Left: Logo */}
        <div className="flex items-center gap-8">
          <a
            href="#"
            className="text-sm font-bold uppercase tracking-[0.25em] text-white transition-opacity hover:opacity-90 md:text-base"
          >
            PAYGATE AI
          </a>
        </div>

        {/* Center: Nav links */}
        <nav className="hidden items-center gap-2 md:flex">
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
                className="flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium text-gray-200 transition-colors duration-200 hover:text-white"
                onClick={() =>
                  setOpenDropdown((current) => (current === item.label ? null : item.label))
                }
              >
                {item.label}
                <ChevronDown
                  size={14}
                  className={cn(
                    "text-gray-400 transition-transform duration-200",
                    openDropdown === item.label && "rotate-180"
                  )}
                />
              </button>

              <AnimatePresence>
                {openDropdown === item.label && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute left-0 top-full mt-2 min-w-[200px] rounded-2xl border border-white/10 bg-[#090d16]/95 p-2 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)] backdrop-blur-xl"
                  >
                    {item.items.map((link) => (
                      <a
                        key={link.href + link.label}
                        href={link.href}
                        onClick={(e) => {
                          e.preventDefault();
                          scrollTo(link.href);
                        }}
                        className="block rounded-lg px-3 py-2 text-sm text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
                      >
                        {link.label}
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        {/* Right: Actions */}
        <div className="hidden items-center gap-3 md:flex">
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-gray-200 transition-colors hover:text-white"
          >
            <Globe size={14} className="text-gray-300" />
            <span>EN</span>
            <ChevronDown size={13} className="text-gray-400" />
          </button>

          <button
            type="button"
            className="rounded-full border border-white/20 px-4 py-1.5 text-xs font-semibold text-white transition-all hover:border-white/40 hover:bg-white/5"
          >
            Sign In
          </button>

          <button
            type="button"
            onClick={() => scrollTo("#demo")}
            className="rounded-full bg-white px-5 py-2 text-xs font-semibold text-black transition-all hover:bg-gray-200 active:scale-95"
          >
            Book a Consultant
          </button>
        </div>

        <button
          className="text-white md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-2 flex max-w-6xl flex-col gap-1 rounded-2xl border border-[var(--color-header-border)] bg-[rgba(10,14,22,0.95)] p-3 shadow-[0_8px_30px_-16px_rgba(0,0,0,0.65)] backdrop-blur-xl md:hidden"
          >
            {headerNav.map((item) => (
              <div key={item.label} className="flex flex-col">
                <span className="px-4 pb-1 pt-3 text-xs font-semibold uppercase tracking-wide text-[var(--color-header-text-muted)]">
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
                    className="rounded-lg px-4 py-2 text-sm font-medium text-[var(--color-header-text)] hover:bg-white/5"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            ))}
            <Button
              variant="header-cta"
              size="sm"
              onClick={() => scrollTo("#demo")}
              className="mt-2 w-full"
            >
              Book a Demo
            </Button>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
