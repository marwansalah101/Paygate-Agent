import { BookOpen, Boxes, Building2 } from "lucide-react";
import type { HeaderNavItem } from "@/types/content";

/** Header's top-level dropdown triggers (Platform / Resources / Company). */
export const headerNav: HeaderNavItem[] = [
  {
    label: "Platform",
    icon: Boxes,
    items: [
      { label: "Overview", href: "#compare" },
      { label: "Pillars", href: "#pillars" },
      { label: "Trust & Compliance", href: "#trust" },
    ],
  },
  {
    label: "Resources",
    icon: BookOpen,
    items: [
      { label: "Engagement Model", href: "#engagement" },
      { label: "Request a Demo", href: "#demo" },
    ],
  },
  {
    label: "Company",
    icon: Building2,
    items: [
      { label: "About", href: "#top" },
      { label: "Contact", href: "#demo" },
    ],
  },
];
