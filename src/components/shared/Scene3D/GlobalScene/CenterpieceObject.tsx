"use client";

import { useRef, type RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { CardCenterpiece } from "./CardCenterpiece";

/* =========================================================
   Tunables — idle, scroll, drift, tilt and breathing all compose
   additively; each owns exactly one property on exactly one group.
   ========================================================= */

const IDLE_ROTATION_SPEED = (Math.PI * 2) / 14; // ~14s per idle revolution (Y)
const SCROLL_ROTATION_RANGE = Math.PI * 6; // several full turns across total page scroll (Y)
const IDLE_ROTATION_X_SPEED = (Math.PI * 2) / 17; // different period than Y so the two axes never sync into a mechanical loop
const SCROLL_ROTATION_X_RANGE = Math.PI * 3; // half of Y's range — X tumbles, Y carries the primary spin
const FLOAT_SPEED = 0.5;
const FLOAT_AMPLITUDE = 0.12;
const DRIFT_CYCLES = 2.5; // up/down oscillations across the whole page — periodic,
const DRIFT_AMPLITUDE = 0.55; // not linear, so it never walks off-screen on a long page
const TILT_RANGE = 0.08; // radians — pointer-parallax tilt, not spin
const TILT_DAMPING = 3;
const BREATH_SPEED = 0.8;
const BREATH_AMPLITUDE = 0.04;

export function CenterpieceObject({
  progressRef,
  pointerRef,
  handoffRef,
}: {
  progressRef: RefObject<number>;
  pointerRef: RefObject<{ x: number; y: number }>;
  /** 0 while the hero owns the viewport, 1 once it has scrolled away. */
  handoffRef: RefObject<number>;
}) {
  const outerRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Group>(null);
  const idleRef = useRef(0);
  const idleXRef = useRef(0);

  useFrame((state, delta) => {
    idleRef.current += delta * IDLE_ROTATION_SPEED;
    idleXRef.current += delta * IDLE_ROTATION_X_SPEED;
    const progress = progressRef.current ?? 0;

    // Smoothstepped so the card eases in as the hero clears rather than
    // popping the instant scrollY leaves zero.
    const handoff = handoffRef.current ?? 1;
    const reveal = handoff * handoff * (3 - 2 * handoff);

    if (outerRef.current) {
      // Skip the draw entirely while the hero's own scene is on screen.
      outerRef.current.visible = reveal > 0.001;
      if (!outerRef.current.visible) return;

      // Absolute assignment every frame, never +=, so rotation is always
      // freshly derived from progress (which itself never resets) — this
      // is what keeps it continuous and non-resetting across sections.
      outerRef.current.rotation.y = idleRef.current + progress * SCROLL_ROTATION_RANGE;
      outerRef.current.rotation.x = idleXRef.current + progress * SCROLL_ROTATION_X_RANGE;
      outerRef.current.position.y =
        Math.sin(state.clock.elapsedTime * FLOAT_SPEED) * FLOAT_AMPLITUDE +
        Math.sin(progress * Math.PI * DRIFT_CYCLES) * DRIFT_AMPLITUDE;
    }

    if (innerRef.current) {
      const pointer = pointerRef.current ?? { x: 0, y: 0 };
      innerRef.current.rotation.x = THREE.MathUtils.lerp(
        innerRef.current.rotation.x,
        pointer.y * TILT_RANGE,
        delta * TILT_DAMPING
      );
      innerRef.current.rotation.z = THREE.MathUtils.lerp(
        innerRef.current.rotation.z,
        -pointer.x * TILT_RANGE,
        delta * TILT_DAMPING
      );
      const breath = 1 + Math.sin(state.clock.elapsedTime * BREATH_SPEED) * BREATH_AMPLITUDE;
      innerRef.current.scale.setScalar(breath * reveal);
    }
  });

  return (
    <group ref={outerRef}>
      <group ref={innerRef}>
        <CardCenterpiece />
      </group>
    </group>
  );
}
