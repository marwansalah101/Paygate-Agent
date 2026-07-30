"use client";

import { useRef } from "react";
import type { RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { setGroupOpacity } from "@/components/shared/Scene3D/setGroupOpacity";
import {
  BottomTriangles,
  CornerTriangles,
  OutlineTriangle,
  RibbonFan,
} from "./TriangleGeometry";
import {
  IDLE_PERIODS,
  IDLE_PHASE_OFFSETS,
  IDLE_POSITION_AMPLITUDE,
  IDLE_ROTATION_AMPLITUDE,
  POINTER_PARALLAX_DAMPING,
  POINTER_PARALLAX_MAX,
} from "./heroSceneConfig";

export function HeroIdleRig({
  pointerRef,
  scrollProgressRef,
  reducedMotion,
}: {
  pointerRef: RefObject<{ x: number; y: number }>;
  scrollProgressRef: RefObject<number>;
  reducedMotion: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const shapesGroupRef = useRef<THREE.Group>(null);
  const parallaxRef = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const scroll = scrollProgressRef.current ?? 0;

    // Background shapes drift away on scroll
    if (shapesGroupRef.current) {
      if (reducedMotion) {
        shapesGroupRef.current.position.set(0, 0, 0);
        shapesGroupRef.current.rotation.set(0, 0, 0);
      } else {
        const floatY = Math.sin((t / IDLE_PERIODS[0]) * Math.PI * 2 + IDLE_PHASE_OFFSETS[0]) * IDLE_POSITION_AMPLITUDE;
        const floatX = Math.cos((t / IDLE_PERIODS[1]) * Math.PI * 2 + IDLE_PHASE_OFFSETS[1]) * IDLE_POSITION_AMPLITUDE;
        const rotateZ = Math.sin((t / IDLE_PERIODS[2]) * Math.PI * 2 + IDLE_PHASE_OFFSETS[2]) * IDLE_ROTATION_AMPLITUDE;

        shapesGroupRef.current.position.set(floatX, floatY - scroll * 0.8, 0);
        shapesGroupRef.current.rotation.set(0, 0, rotateZ);
        setGroupOpacity(shapesGroupRef.current, 1 - scroll * 0.85);
      }
    }

    // Pointer Parallax
    const group = groupRef.current;
    if (!group) return;

    if (reducedMotion) {
      group.rotation.set(0, 0, 0);
      return;
    }

    const pointer = pointerRef.current ?? { x: 0, y: 0 };
    parallaxRef.current.x = THREE.MathUtils.lerp(
      parallaxRef.current.x,
      pointer.y * POINTER_PARALLAX_MAX,
      delta * POINTER_PARALLAX_DAMPING
    );
    parallaxRef.current.y = THREE.MathUtils.lerp(
      parallaxRef.current.y,
      pointer.x * POINTER_PARALLAX_MAX,
      delta * POINTER_PARALLAX_DAMPING
    );
    group.rotation.x = parallaxRef.current.x;
    group.rotation.y = parallaxRef.current.y;
  });

  return (
    <group ref={groupRef}>
      <group ref={shapesGroupRef}>
        <RibbonFan />
        <CornerTriangles />
        <BottomTriangles />
        <OutlineTriangle />
      </group>
    </group>
  );
}
