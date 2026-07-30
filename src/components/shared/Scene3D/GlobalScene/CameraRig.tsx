"use client";

import { useRef, type RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* Camera stays mostly fixed — small scroll-tied nudge only, lerped on top
   of GSAP's own scrub smoothing for a cinematic (not snapping) feel. */
const CAMERA_BASE_Y = 0;
const CAMERA_SCROLL_RANGE_Y = 0.6;
const CAMERA_SCROLL_RANGE_X = 0.2;
const CAMERA_DAMPING = 2;

export function CameraRig({ progressRef }: { progressRef: RefObject<number> }) {
  const targetRef = useRef(new THREE.Vector2(0, CAMERA_BASE_Y));

  useFrame((state, delta) => {
    const progress = progressRef.current ?? 0;
    targetRef.current.set(
      Math.sin(progress * Math.PI * 2) * CAMERA_SCROLL_RANGE_X,
      CAMERA_BASE_Y + (progress - 0.5) * CAMERA_SCROLL_RANGE_Y
    );
    state.camera.position.x = THREE.MathUtils.lerp(
      state.camera.position.x,
      targetRef.current.x,
      delta * CAMERA_DAMPING
    );
    state.camera.position.y = THREE.MathUtils.lerp(
      state.camera.position.y,
      targetRef.current.y,
      delta * CAMERA_DAMPING
    );
  });

  return null;
}
