import type { LucideIcon } from "lucide-react";

export interface NavLink {
  label: string;
  href: string;
}

/** A top-level header nav item that opens a dropdown of sub-links. */
export interface HeaderNavItem {
  label: string;
  icon: LucideIcon;
  items: NavLink[];
}

/** The four government/verification APIs the hero glass-node object represents. */
export type ApiNodeName = "Wathiq" | "Yakeen" | "Nafath" | "Tahakouk";

export interface CompareLegacyStep {
  label: string;
}

export interface CompareApiNode {
  label: ApiNodeName | "Compliance";
}

export type PillarId = "smart" | "swift" | "scalable" | "secure";

export interface PillarDetail {
  title: string;
  description: string;
}

export interface PillarContent {
  id: PillarId;
  index: "01" | "02" | "03" | "04";
  name: string;
  question: string;
  summary: string;
  body: string;
  details: PillarDetail[];
  icon: LucideIcon;
}

export interface TrustBadge {
  name: string;
  kind: "institution" | "framework";
}

export interface EngagementDetail {
  label: string;
  value: string;
}

export interface EngagementStage {
  index: "01" | "02" | "03" | "04";
  title: string;
  tagline: string;
  details: EngagementDetail[];
}

export interface SocialLink {
  label: string;
  href: string;
  icon: LucideIcon;
}
