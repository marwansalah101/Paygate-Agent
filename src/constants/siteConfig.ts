import { Linkedin, Instagram, Youtube } from "lucide-react";
import type { SocialLink } from "@/types/content";

export const siteConfig = {
  name: "PayGate",
  tagline: "Onboard merchants in under 3 minutes.",
  description:
    "AI-powered merchant onboarding for Saudi Arabia — PayGate compresses a 15-minute, 25-field process into under 3 minutes by orchestrating Wathiq, Yakeen, and Nafath in parallel.",
  email: "innovation@quantorx.com",
  usPhone: "+18134471388",
  ksaPhone: "+966537507578",
  egyPhone: "+201119974983",
  location: "Cairo, Egypt",
  social: [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/quantorx/", icon: Linkedin },
    { label: "Instagram", href: "https://www.instagram.com/quantorx.ai/", icon: Instagram },
    { label: "Youtube", href: "https://www.youtube.com/@QuantorxAI", icon: Youtube }
  ] satisfies SocialLink[],
};
