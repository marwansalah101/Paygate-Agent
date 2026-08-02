import type { HeaderNavItem } from "@/types/content";

/** Header's top-level dropdown triggers (Platform / Resources / Company). */
export const headerNav: HeaderNavItem[] = [
  {
    label: "Platform",
    items: [
      { label: "Overview", href: "#compare" },
      { label: "Pillars", href: "#pillars" },
      { label: "Trust & Compliance", href: "#trust" },
    ],
  },
  {
    label: "Resources",
    items: [
      { label: "Engagement Model", href: "#engagement" },
      { label: "Request a Demo", href: "#demo" },
    ],
  },
  {
    label: "Company",
    items: [
      { label: "About", href: "#top" },
      { label: "Contact", href: "#demo" },
    ],
  },
];
