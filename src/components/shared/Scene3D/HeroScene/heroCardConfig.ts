import type { PctPoint } from "./heroSceneConfig";

/* =========================================================
   Hero payment-gateway card centerpiece — shared tunables.

   Same "hand-tuned viewport-fraction" convention as heroSceneConfig.ts:
   the anchor is an eyeballed screen position (0..1, y-down, top-left
   origin), not measured off the DOM, because the hero's headline is
   fixed two-line markup rather than reflowing text — the vertical
   rhythm is already author-controlled, so a hand-picked anchor won't
   drift out of alignment with the reserved spacer in Hero.tsx.
   ========================================================= */

/** Screen position the card's origin sits at, per layout. Nudge by eye
 *  in-browser if the reserved spacer height in Hero.tsx changes.
 *
 * Desktop x/y deliberately clear of the ribbon's apex (heroSceneConfig's
 * RIBBON.apexX/apexY ≈ 0.56/0.49) — the ribbon's OutlineTriangle draws
 * with depthTest disabled (it's meant to always trace its own silhouette
 * on top of the ribbon's own fill), so it also draws on top of the card
 * wherever the two overlap on screen. Sitting the card below and right of
 * the apex keeps it clear of that sweep instead of fighting it. */
export const CARD_ANCHOR_DESKTOP: PctPoint = { x: 0.53, y: 0.64 };
export const CARD_ANCHOR_MOBILE: PctPoint = { x: 0.5, y: 0.6 };

/* ---------------------------------------------------------
   Scale — HeroScene's camera is orthographic (1 world unit = 1 CSS
   pixel, see TriangleGeometry.tsx's toWorld comment), unlike GlobalScene's
   perspective camera that CARD_WIDTH/CARD_HEIGHT were authored for. To
   render at a usable on-screen size here, the card is wrapped in a group
   scaled by targetPx / CARD_WIDTH — a large multiplier (~100-200), not a
   fractional shrink.
   --------------------------------------------------------- */
export const CARD_WIDTH_FRACTION = 0.3; // × canvas width
export const CARD_MIN_PX = 240;
export const CARD_MAX_PX = 440;

/** Depth offset (world units, not viewport-fraction — purely for draw
 *  order along the view axis). Must NOT sit too close to the camera
 *  (z=10): the group's uniform scale (~100-220x, see baseScale above)
 *  multiplies CARD_DEPTH along with width/height, so the card's world-
 *  space depth can reach ~30+ units — comparable to the camera's own
 *  distance from the anchor. Placed too close (e.g. z=2, only 8 units
 *  from the camera), the camera ends up *inside* the scaled card's
 *  volume, back-face culling hides every front-facing triangle, and only
 *  thin silhouette-edge fragments survive — the card appears as a hollow
 *  outline instead of a filled object. -20 keeps the camera comfortably
 *  outside the card's depth extent at every scale, while still sitting
 *  in front of the ribbon/corner triangles (z <= -6, more negative is
 *  further back) wherever they'd otherwise overlap it on screen. */
export const CARD_Z = -20;

/* ---------------------------------------------------------
   Idle motion — bounded oscillation, not CenterpieceObject's continuous
   spin: this card's face is the brand/product moment, so the wordmark
   needs to stay legible most of the time, not tumble edge-on. Amplitudes
   for rotation are in radians (camera-agnostic); position amplitudes are
   authored as viewport-fraction (scaled by canvas height at render time,
   same convention heroSceneConfig.ts uses for the triangles' idle drift).
   --------------------------------------------------------- */
export const IDLE_YAW_AMPLITUDE = 0.32; // rad, ~18°
export const IDLE_YAW_PERIOD = 11; // seconds per full cycle
export const IDLE_PITCH_AMPLITUDE = 0.12; // rad, ~7° — smaller than yaw
export const IDLE_PITCH_PERIOD = 8.5; // different period so axes never sync

export const POINTER_TILT_RANGE = 0.1; // rad, additive pointer parallax
export const POINTER_TILT_DAMPING = 3; // lerp damping, same as CenterpieceObject/HeroIdleRig

export const FLOAT_SPEED = 0.5;
export const FLOAT_AMPLITUDE_FRACTION = 0.012; // × canvas height

export const BREATH_SPEED = 0.8;
export const BREATH_AMPLITUDE = 0.035;

/* ---------------------------------------------------------
   Scroll-exit — settle and fade in the same visual language as
   HeroIdleRig's triangle groups, but with smaller amplitude: this is the
   hero's product shot, so it should ease out quietly rather than spin
   away like the decorative background does.
   --------------------------------------------------------- */
export const SCROLL_DRIFT: [number, number] = [0, 0.05]; // viewport-fraction, drifts gently downward
export const SCROLL_ROTATION_AMPLITUDE = 0.15;
