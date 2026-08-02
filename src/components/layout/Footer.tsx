"use client";

import { ArrowUp, Mail, MapPin } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/Button";
import { RevealText } from "@/components/shared/RevealText";
import { headerNav } from "@/constants/nav";
import { siteConfig } from "@/constants/siteConfig";
import { useLenis } from "@/hooks/useLenis";

export function Footer() {
  const lenis = useLenis();

  const scrollTo = (href: string) => {
    const target = document.querySelector(href);
    if (!target) return;
    if (lenis) {
      lenis.scrollTo(target as HTMLElement, { offset: -24, duration: 1.2 });
    } else {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="relative overflow-hidden border-t border-[var(--color-gray-200)] bg-white px-4 py-14 md:px-8 md:py-16">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full opacity-50 blur-3xl"
        style={{
          background: "radial-gradient(circle, var(--color-blue-tag-bg) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="flex flex-col gap-10 md:flex-row md:gap-20 lg:gap-28">
          {/* Brand column */}
          <RevealText as="div" x={-56} y={0} className="max-w-xs shrink-0">
            <motion.a
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("#top");
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-fit text-base font-semibold tracking-tight text-[var(--color-gray-900)]"
            >
              {siteConfig.name}
            </motion.a>

            <p className="mt-2 text-xs font-medium text-[var(--color-gray-900)]">
              {siteConfig.tagline}
            </p>

            <p className="mt-2 text-xs leading-normal text-[var(--color-gray-500)]">
              {siteConfig.description}
            </p>

            <div className="mt-4 flex items-center gap-3">
              {siteConfig.social.map(({ label, href, icon: Icon }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.08, y: -2 }}
                  whileTap={{ scale: 0.94 }}
                  className="text-[var(--color-gray-500)] transition-colors duration-200 hover:text-[var(--color-blue-primary)]"
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </RevealText>

          {/* Grouped nav — mirrors Header's dropdown structure */}
          <RevealText
            as="div"
            x={56}
            y={0}
            delay={0.1}
            className="grid grid-cols-2 gap-6 sm:grid-cols-4 md:flex md:gap-12"
          >
            {headerNav.map((group) => (
              <div key={group.label}>
                <span className="text-[11px] font-semibold uppercase tracking-wide text-[var(--color-gray-900)]">
                  {group.label}
                </span>
                <nav className="mt-3 flex flex-col gap-2">
                  {group.items.map((link) => (
                    <motion.a
                      key={link.href + link.label}
                      href={link.href}
                      whileHover={{ x: 3 }}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollTo(link.href);
                      }}
                      className="w-fit text-xs text-[var(--color-gray-500)] transition-colors duration-200 hover:text-[var(--color-gray-900)]"
                    >
                      {link.label}
                    </motion.a>
                  ))}
                </nav>
              </div>
            ))}

            {/* Contact */}
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wide text-[var(--color-gray-900)]">
                Contact
              </span>
              <div className="mt-3 flex flex-col gap-2">
                <motion.a
                  href={`mailto:${siteConfig.email}`}
                  whileHover={{ x: 3 }}
                  className="flex w-fit items-center gap-1.5 text-xs text-[var(--color-gray-500)] transition-colors duration-200 hover:text-[var(--color-gray-900)]"
                >
                  <Mail size={12} className="shrink-0" />
                  {siteConfig.email}
                </motion.a>
                <span className="flex items-center gap-1.5 text-xs text-[var(--color-gray-500)]">
                  <MapPin size={12} className="shrink-0" />
                  {siteConfig.location}
                </span>
              </div>
            </div>
          </RevealText>
        </div>

        {/* Legal bar */}
        <div className="mt-10 flex flex-col-reverse gap-4 border-t border-[var(--color-gray-200)] pt-6 text-xs text-[var(--color-gray-500)] md:flex-row md:items-center md:justify-between">
          <span>
            © {new Date().getFullYear()} {siteConfig.name}. Pilot demo — not a live payment
            processor.
          </span>
          <Button variant="ghost" size="sm" onClick={() => scrollTo("#top")}>
            <ArrowUp size={14} /> Back to top
          </Button>
        </div>
      </div>
    </footer>
  );
}
