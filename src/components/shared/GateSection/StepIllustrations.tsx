interface IllustrationProps {
  className?: string;
}

const LINE = "#FAFAFA";
const LINE_MUTED = "rgba(250, 250, 250, 0.45)";
const ACCENT = "var(--color-paygate-blue)";
const DARK_SURFACE = "#1F1C1B";
const ACCENT_SOFT = "rgba(21, 101, 216, 0.16)";

/** 01 - Verify Your Business: a CR document scanned and checked. */
export function VerifyIllustration({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 240 240" fill="none" className={className} aria-hidden="true">
      <circle cx="120" cy="120" r="88" fill={ACCENT_SOFT} opacity="0.38" />
      <rect x="48" y="40" width="104" height="152" rx="10" stroke={ACCENT} strokeWidth="2.5" />
      <path d="M130 40 L152 40 L152 62" stroke={ACCENT} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="64" y1="68" x2="120" y2="68" stroke={LINE} strokeWidth="3.5" strokeLinecap="round" />
      <line x1="64" y1="92" x2="136" y2="92" stroke={LINE_MUTED} strokeWidth="2" strokeLinecap="round" />
      <line x1="64" y1="108" x2="124" y2="108" stroke={LINE_MUTED} strokeWidth="2" strokeLinecap="round" />
      <line x1="64" y1="124" x2="112" y2="124" stroke={LINE_MUTED} strokeWidth="2" strokeLinecap="round" />
      <rect x="64" y="136" width="56" height="8" rx="4" fill={ACCENT_SOFT} />
      <line x1="64" y1="148" x2="98" y2="148" stroke={LINE_MUTED} strokeWidth="2" strokeLinecap="round" />
      <line x1="64" y1="164" x2="108" y2="164" stroke={LINE_MUTED} strokeWidth="2" strokeLinecap="round" />
      <path d="M42 132 H134" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" opacity="0.75" />
      <circle cx="170" cy="152" r="28" stroke={ACCENT} strokeWidth="2.5" fill={DARK_SURFACE} />
      <line x1="190" y1="172" x2="210" y2="192" stroke={ACCENT} strokeWidth="4" strokeLinecap="round" />
      <path d="M158 152 L167 161 L184 141" stroke={LINE} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** 02 - AI Business Setup: an auto-configuring chip in orbit. */
export function AISetupIllustration({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 240 240" fill="none" className={className} aria-hidden="true">
      <circle cx="120" cy="120" r="86" fill={ACCENT_SOFT} opacity="0.3" />
      <circle cx="120" cy="120" r="86" stroke={LINE_MUTED} strokeWidth="1.5" strokeDasharray="3 7" />
      <rect x="86" y="86" width="68" height="68" rx="16" fill={DARK_SURFACE} stroke={ACCENT} strokeWidth="2.5" />
      <rect x="105" y="105" width="30" height="30" rx="6" stroke={LINE} strokeWidth="2" />
      {[98, 120, 142].map((y) => (
        <line key={`l-${y}`} x1="70" y1={y} x2="86" y2={y} stroke={ACCENT} strokeWidth="2.5" strokeLinecap="round" />
      ))}
      {[98, 120, 142].map((y) => (
        <line key={`r-${y}`} x1="154" y1={y} x2="170" y2={y} stroke={ACCENT} strokeWidth="2.5" strokeLinecap="round" />
      ))}
      {[98, 120, 142].map((x) => (
        <line key={`t-${x}`} x1={x} y1="70" x2={x} y2="86" stroke={ACCENT} strokeWidth="2.5" strokeLinecap="round" />
      ))}
      {[98, 120, 142].map((x) => (
        <line key={`b-${x}`} x1={x} y1="154" x2={x} y2="170" stroke={ACCENT} strokeWidth="2.5" strokeLinecap="round" />
      ))}
      <circle cx="120" cy="34" r="5" fill={ACCENT} />
      <path
        d="M176 48 L180 58 L190 62 L180 66 L176 76 L172 66 L162 62 L172 58 Z"
        fill={LINE}
      />
    </svg>
  );
}

/** 03 - Review & Confirm: a checklist with items confirmed. */
export function ReviewIllustration({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 240 240" fill="none" className={className} aria-hidden="true">
      <circle cx="120" cy="120" r="88" fill={ACCENT_SOFT} opacity="0.32" />
      <rect x="58" y="46" width="124" height="150" rx="12" fill={DARK_SURFACE} stroke={ACCENT} strokeWidth="2.5" />
      <rect x="98" y="34" width="44" height="20" rx="6" fill={DARK_SURFACE} stroke={ACCENT} strokeWidth="2.5" />
      <rect x="76" y="80" width="16" height="16" rx="4" stroke={ACCENT} strokeWidth="2.5" />
      <path d="M80 88 L86 94 L96 78" stroke={LINE} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="102" y1="88" x2="166" y2="88" stroke={LINE_MUTED} strokeWidth="2" strokeLinecap="round" />
      <rect x="76" y="114" width="16" height="16" rx="4" stroke={ACCENT} strokeWidth="2.5" />
      <path d="M80 122 L86 128 L96 112" stroke={LINE} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="102" y1="122" x2="154" y2="122" stroke={LINE_MUTED} strokeWidth="2" strokeLinecap="round" />
      <rect x="76" y="148" width="16" height="16" rx="4" stroke={ACCENT} strokeWidth="2.5" />
      <path d="M80 156 L86 162 L96 146" stroke={LINE} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="102" y1="156" x2="146" y2="156" stroke={LINE_MUTED} strokeWidth="2" strokeLinecap="round" />
      <rect x="80" y="178" width="80" height="8" rx="4" fill={ACCENT_SOFT} />
    </svg>
  );
}

/** 04 - Start Accepting Payments: a card ready for contactless payment. */
export function PaymentsIllustration({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 240 240" fill="none" className={className} aria-hidden="true">
      <circle cx="120" cy="120" r="88" fill={ACCENT_SOFT} opacity="0.32" />
      <rect x="46" y="78" width="148" height="92" rx="15" fill={DARK_SURFACE} stroke={ACCENT} strokeWidth="2.5" />
      <line x1="46" y1="104" x2="194" y2="104" stroke={LINE} strokeWidth="3" />
      <rect x="62" y="123" width="30" height="22" rx="4" stroke={LINE_MUTED} strokeWidth="2" />
      <line x1="62" y1="153" x2="112" y2="153" stroke={LINE_MUTED} strokeWidth="2" strokeLinecap="round" />
      <line x1="128" y1="153" x2="166" y2="153" stroke={LINE_MUTED} strokeWidth="2" strokeLinecap="round" />
      <line x1="126" y1="132" x2="146" y2="132" stroke={LINE_MUTED} strokeWidth="2" strokeLinecap="round" />
      <circle cx="164" cy="132" r="20" fill={DARK_SURFACE} stroke={ACCENT} strokeWidth="2.5" />
      <circle cx="164" cy="132" r="12" fill={ACCENT_SOFT} />
      <path d="M155 132 L162 139 L175 124" stroke={LINE} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="72" y="181" width="96" height="8" rx="4" fill={ACCENT_SOFT} />
      <rect x="72" y="181" width="68" height="8" rx="4" fill={ACCENT} opacity="0.72" />
    </svg>
  );
}

export const STEP_ILLUSTRATIONS = [
  VerifyIllustration,
  AISetupIllustration,
  ReviewIllustration,
  PaymentsIllustration,
];
