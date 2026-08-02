"use client";

import { Suspense, useEffect, useState, type RefObject } from "react";
import { Canvas } from "@react-three/fiber";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useMousePointer } from "@/components/shared/Scene3D/useMousePointer";
import { HeroIdleRig } from "./HeroIdleRig";
import { useHeroScrollProgress } from "./useHeroScrollProgress";
import { CAMERA_POSITION } from "./heroSceneConfig";

export function HeroScene({ sectionRef }: { sectionRef: RefObject<HTMLElement | null> }) {
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(true);

  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const pointerRef = useMousePointer(!isMobile && !reducedMotion);
  const scrollProgressRef = useHeroScrollProgress(sectionRef);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { rootMargin: "800px" }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, [sectionRef]);

  if (!mounted) return null;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-1">
      <Canvas
        orthographic
        frameloop={active ? "always" : "never"}
        dpr={isMobile ? [1, 1.25] : [1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: CAMERA_POSITION }}
      >
        <ambientLight intensity={1.0} />
        <Suspense fallback={null}>
          <HeroIdleRig
            pointerRef={pointerRef}
            scrollProgressRef={scrollProgressRef}
            reducedMotion={reducedMotion}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
