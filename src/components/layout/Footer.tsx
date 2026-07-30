import { navLinks } from "@/constants/nav";
import { siteConfig } from "@/constants/siteConfig";

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-gray-200)] px-4 py-10 md:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2 text-sm font-semibold tracking-tight text-[var(--color-gray-900)]">
          <span className="h-2 w-2 rounded-full bg-[var(--color-blue-primary)] shadow-[0_0_12px_var(--color-blue-primary)]" />
          {siteConfig.name}
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs font-medium uppercase tracking-wide text-[var(--color-gray-500)] transition-colors hover:text-[var(--color-gray-900)]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          {siteConfig.social.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className="text-xs font-medium text-[var(--color-gray-500)] transition-colors hover:text-[var(--color-gray-900)]"
            >
              {social.label}
            </a>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-6xl text-xs text-[var(--color-gray-500)]/60">
        © {new Date().getFullYear()} {siteConfig.name}. Pilot demo — not a live payment processor.
      </div>
    </footer>
  );
}
