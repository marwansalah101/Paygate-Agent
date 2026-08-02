import { Linkedin, X } from "lucide-react";
import type { SocialLink } from "@/types/content";

export const siteConfig = {
  name: "PayGate",
  tagline: "Onboard merchants in under 3 minutes.",
  description:
    "AI-powered merchant onboarding for Saudi Arabia — PayGate compresses a 15-minute, 25-field process into under 3 minutes by orchestrating Wathiq, Yakeen, and Nafath in parallel.",
  email: "hello@paygate.sa",
  location: "Riyadh, Saudi Arabia",
  social: [
    { label: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
    { label: "X", href: "https://x.com", icon: X },
  ] satisfies SocialLink[],
};
