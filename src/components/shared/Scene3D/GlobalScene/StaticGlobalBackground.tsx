"use client";

/** Reduced-motion / pre-mount fallback — no WebGL mounted at all, saves the
 *  full render-loop cost rather than just freezing useFrame. Light-toned to
 *  match the site's light-mode sections, which are now translucent enough
 *  for this fallback to show through underneath every one of them. */
export function StaticGlobalBackground() {
  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        pointerEvents: "none",
        background:
          "radial-gradient(60% 50% at 50% 40%, var(--color-blue-glow-soft) 0%, transparent 60%), var(--color-gray-50)",
      }}
    />
  );
}
