import type { CompareApiNode, CompareLegacyStep } from "@/types/content";

/**
 * Illustrative legacy screen stack — the brief specifies "25+ manual inputs across
 * 10+ screens (~15 min)" structurally but doesn't name each screen; these are
 * representative merchant-onboarding form steps, not sourced claims.
 */
export const compareLegacySteps: CompareLegacyStep[] = [
  { label: "Business legal name" },
  { label: "Commercial registration number" },
  { label: "Owner national ID" },
  { label: "Business address" },
  { label: "Bank account details" },
  { label: "IBAN verification" },
  { label: "Business category" },
  { label: "Website / social proof" },
  { label: "Contact person" },
  { label: "Terms & compliance attestation" },
];

export const compareApiNodes: CompareApiNode[] = [
  { label: "Wathiq" },
  { label: "Yakeen" },
  { label: "Tahakouk" },
  { label: "Compliance" },
];

export const compareLegacyLabel = "~15 min of manual form-filling, then days of review";
export const compareLegacyTimeDisplay = "15:00";
export const compareNewTimeDisplay = "2:41";
