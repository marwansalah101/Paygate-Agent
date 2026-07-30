"use client";

import { useMemo, useRef, type RefObject } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { setGroupOpacity } from "@/components/shared/Scene3D/setGroupOpacity";
import { CardCenterpiece } from "@/components/shared/Scene3D/GlobalScene/CardCenterpiece";
import { CARD_WIDTH } from "@/components/shared/Scene3D/GlobalScene/CardBody";
import { toWorld } from "./TriangleGeometry";
import {
  BREATH_AMPLITUDE,
  BREATH_SPEED,
  CARD_ANCHOR_DESKTOP,
  CARD_ANCHOR_MOBILE,
  CARD_MAX_PX,
  CARD_MIN_PX,
  CARD_WIDTH_FRACTION,
  CARD_Z,
  FLOAT_AMPLITUDE_FRACTION,
  FLOAT_SPEED,
  IDLE_PITCH_AMPLITUDE,
  IDLE_PITCH_PERIOD,
  IDLE_YAW_AMPLITUDE,
  IDLE_YAW_PERIOD,
  POINTER_TILT_DAMPING,
  POINTER_TILT_RANGE,
  SCROLL_DRIFT,
  SCROLL_ROTATION_AMPLITUDE,
} from "./heroCardConfig";

/**
 * The hero's own "payment gateway" visual — the same procedurally-textured
 * card asset GlobalScene's CenterpieceObject shows later on the page,
 * brought into HeroScene's own (already-existing) orthographic canvas as
 * the primary hero visual, anchored under the headline.
 *
 * Deliberately NOT a copy of CenterpieceObject's motion: that one spins
 * continuously (fine for an ambient background object nobody needs to
 * read). This is the hero's product/brand moment, so it holds a bounded
 * oscillation instead — turns gently like something being held, never
 * spins edge-on long enough to hide the wordmark.
 */
export function HeroCardCenterpiece({
  pointerRef,
  scrollProgressRef,
  reducedMotion,
  isMobile,
}: {
  pointerRef: RefObject<{ x: number; y: number }>;
  scrollProgressRef: RefObject<number>;
  reducedMotion: boolean;
  isMobile: boolean;
}) {
  const { width, height } = useThree((state) => state.size);

  const outerRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Group>(null);
  const tiltRef = useRef({ x: 0, z: 0 });

  const anchor = useMemo(() => {
    const point = isMobile ? CARD_ANCHOR_MOBILE : CARD_ANCHOR_DESKTOP;
    const [x, y] = toWorld(point, width, height);
    return { x, y };
  }, [isMobile, width, height]);

  const baseScale = useMemo(() => {
    const target = Math.min(Math.max(width * CARD_WIDTH_FRACTION, CARD_MIN_PX), CARD_MAX_PX);
    return target / CARD_WIDTH;
  }, [width]);

  useFrame((state, delta) => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    if (reducedMotion) {
      outer.position.set(anchor.x, anchor.y, CARD_Z);
      outer.rotation.set(0, 0, 0);
      setGroupOpacity(outer, 1);
      inner.rotation.set(0, 0, 0);
      inner.position.set(0, 0, 0);
      inner.scale.setScalar(baseScale);
      return;
    }

    const t = state.clock.elapsedTime;
    const scroll = scrollProgressRef.current ?? 0;

    const [driftX, driftY] = SCROLL_DRIFT;
    outer.position.set(
      anchor.x + driftX * scroll * width,
      anchor.y - driftY * scroll * height,
      CARD_Z
    );
    outer.rotation.z = SCROLL_ROTATION_AMPLITUDE * scroll;
    setGroupOpacity(outer, 1 - scroll);

    const idleYaw = Math.sin((t / IDLE_YAW_PERIOD) * Math.PI * 2) * IDLE_YAW_AMPLITUDE;
    const idlePitch = Math.sin((t / IDLE_PITCH_PERIOD) * Math.PI * 2) * IDLE_PITCH_AMPLITUDE;

    const pointer = pointerRef.current ?? { x: 0, y: 0 };
    tiltRef.current.x = THREE.MathUtils.lerp(
      tiltRef.current.x,
      pointer.y * POINTER_TILT_RANGE,
      delta * POINTER_TILT_DAMPING
    );
    tiltRef.current.z = THREE.MathUtils.lerp(
      tiltRef.current.z,
      -pointer.x * POINTER_TILT_RANGE,
      delta * POINTER_TILT_DAMPING
    );

    inner.rotation.y = idleYaw;
    inner.rotation.x = idlePitch + tiltRef.current.x;
    inner.rotation.z = tiltRef.current.z;
    inner.position.y = Math.sin(t * FLOAT_SPEED) * FLOAT_AMPLITUDE_FRACTION * height;

    const breath = 1 + Math.sin(t * BREATH_SPEED) * BREATH_AMPLITUDE;
    inner.scale.setScalar(baseScale * breath);
  });

  return (
    <group ref={outerRef}>
      <group ref={innerRef}>
        <CardCenterpiece />
      </group>
    </group>
  );
}
