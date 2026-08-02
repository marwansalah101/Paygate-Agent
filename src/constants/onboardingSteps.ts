export interface OnboardingStep {
  number: string;
  title: string;
  desc: string;
}

export const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    number: "01",
    title: "Verify Your Business",
    desc: "Enter your Commercial Registration (CR) number and let PayGate instantly verify your business through trusted providers.",
  },
  {
    number: "02",
    title: "AI Business Setup",
    desc: "Our AI analyzes your business, assigns the correct MCC, configures your merchant profile, and recommends the best payment setup automatically.",
  },
  {
    number: "03",
    title: "Review & Confirm",
    desc: "Review the information PayGate prepared for you, make any edits if needed, and confirm everything is correct.",
  },
  {
    number: "04",
    title: "Start Accepting Payments",
    desc: "Your merchant account is ready, payment methods are activated, and you're ready to start accepting payments immediately.",
  },
];
