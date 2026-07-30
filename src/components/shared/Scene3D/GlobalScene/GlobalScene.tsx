"use client";

import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useMousePointer } from "@/components/shared/Scene3D/useMousePointer";
import { useHeroHandoff } from "@/components/shared/Scene3D/useHeroHandoff";
import { useDocumentScrollProgress } from "./useDocumentScrollProgress";
import { CameraRig } from "./CameraRig";
import { CenterpieceObject } from "./CenterpieceObject";
import { ParticleField } from "./ParticleField";
import { SceneLighting } from "./SceneLighting";
import { BloomEffects } from "./BloomEffects";
import { StaticGlobalBackground } from "./StaticGlobalBackground";

/**
 * Permanent, full-site 3D background — mounted once at the root layout,
 * never unmounts while navigating the page.
 */
export function GlobalScene() {
  const [mounted, setMounted] = useState(false);
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const progressRef = useDocumentScrollProgress();
  const pointerRef = useMousePointer(!isMobile && !reducedMotion);
  // The hero runs its own scene with its own two cards; this centerpiece
  // stays out of the way until that scene has scrolled off.
  const handoffRef = useHeroHandoff();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;
  if (reducedMotion) return <StaticGlobalBackground />;

  return (
    <div aria-hidden style={{ position: "fixed", inset: 0, zIndex: -1, pointerEvents: "none" }}>
      <Canvas
        dpr={isMobile ? [1, 1.25] : [1, 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 6], fov: 35 }}
      >
        <SceneLighting />
        <CameraRig progressRef={progressRef} />
        <CenterpieceObject
          progressRef={progressRef}
          pointerRef={pointerRef}
          handoffRef={handoffRef}
        />
        <ParticleField />
        <BloomEffects />
      </Canvas>
    </div>
  );
}
