import { Layers, ShieldCheck, Sparkles, Zap } from "lucide-react";
import type { PillarContent } from "@/types/content";

export const pillars: PillarContent[] = [
  {
    id: "smart",
    index: "01",
    name: "Smart",
    question: "How Smart?",
    summary: "Ready to work, industry aware.",
    body: "One CR number in, verified identity, business, bank, and category out — in Arabic or English.",
    details: [
      {
        title: "Not a chatbot bolted onto forms",
        description:
          "Omni-agents are the operators — they call Wathiq, Yakeen, Nafath, and Tahakouk directly and assemble the profile themselves.",
      },
      {
        title: "Shows its sources at every step",
        description:
          "Every field the agent fills traces back to the government registry it came from.",
      },
    ],
    icon: Sparkles,
  },
  {
    id: "swift",
    index: "02",
    name: "Swift",
    question: "How Swift?",
    summary: "~15 min of manual form-filling, then days of review — down to 2:41.",
    body: "2:41 min, measured end to end on the working prototype, CR number to submitted application.",
    details: [
      {
        title: "Four checks, one pass",
        description:
          "Wathiq, Yakeen, Tahakouk, and compliance screening run in parallel, visible live on screen.",
      },
      {
        title: "The profile fills itself",
        description:
          "While verification runs, the merchant's profile panel populates in real time — no field re-entry.",
      },
    ],
    icon: Zap,
  },
  {
    id: "scalable",
    index: "03",
    name: "Scalable",
    question: "How Scalable?",
    summary: "Onboarding 10 merchants or 10,000 is the same architecture.",
    body: "Stateless services scale out behind a load balancer.",
    details: [
      {
        title: "Fronts your existing stack",
        description:
          "Additive integration in front of the partner's existing gateway/back office — not a rip-and-replace.",
      },
      {
        title: "Deploy where you need it",
        description: "Cloud, on-prem, or inside your own perimeter.",
      },
    ],
    icon: Layers,
  },
  {
    id: "secure",
    index: "04",
    name: "Secure",
    question: "How Secure?",
    summary: "SAMA Cybersecurity Framework, Saudi PDPL, PCI DSS, Nafath, SDAIA AI Ethics & GenAI Guidelines.",
    body: "Account numbers, IBANs, and national IDs are masked before reaching any model.",
    details: [
      {
        title: "Every field shows its receipts",
        description: "Every field carries a provenance badge showing its source registry.",
      },
      {
        title: "Never fakes live behavior",
        description:
          "When a provider is unavailable, capability degrades honestly — never fakes live behavior.",
      },
    ],
    icon: ShieldCheck,
  },
];
