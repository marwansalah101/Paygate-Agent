"use client";

import { Sparkles } from "@react-three/drei";
import { useIsMobile } from "@/hooks/useIsMobile";

const BLUE = "#2e7df5";
const WHITE = "#eaf2ff";

export function ParticleField() {
  const isMobile = useIsMobile();

  return (
    <>
      <Sparkles
        count={isMobile ? 24 : 60}
        scale={[9, 6, 4]}
        size={2}
        speed={0.15}
        opacity={0.5}
        color={WHITE}
      />
      <Sparkles
        count={isMobile ? 60 : 160}
        scale={[10, 7, 5]}
        size={1.4}
        speed={0.25}
        opacity={0.6}
        color={BLUE}
      />
    </>
  );
}
