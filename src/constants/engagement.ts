import type { EngagementStage } from "@/types/content";

export const engagementStages: EngagementStage[] = [
  {
    index: "01",
    title: "Profiling",
    tagline: "We understand your needs.",
    details: [
      { label: "Objectives", value: "Merchant segments & funnel goals." },
      { label: "Inputs/outputs", value: "Flows & compliance checklist." },
    ],
  },
  {
    index: "02",
    title: "Onboarding",
    tagline: "We introduce it to your environment.",
    details: [
      {
        label: "Preparation",
        value: "Wire real Wathiq, Yakeen, Nafath & SPL behind the typed interfaces.",
      },
      { label: "Integrations", value: "Governance with your gateway." },
    ],
  },
  {
    index: "03",
    title: "Probation",
    tagline: "You experience the difference.",
    details: [
      { label: "Pilot", value: "Cohort of live merchants." },
      { label: "Measure", value: "Conversion & time-to-activation vs. today." },
    ],
  },
  {
    index: "04",
    title: "Performing",
    tagline: "You enjoy the impact.",
    details: [
      { label: "Scale", value: "To the full funnel." },
      {
        label: "Grow",
        value: "Omni-agents extend into daily merchant operations (reconciliation, diagnosis, payment links).",
      },
    ],
  },
];
