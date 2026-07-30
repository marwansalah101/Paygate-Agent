"use client";

import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useIsMobile } from "@/hooks/useIsMobile";

export function BloomEffects() {
  const isMobile = useIsMobile();

  return (
    <EffectComposer>
      <Bloom
        luminanceThreshold={0.7}
        luminanceSmoothing={0.25}
        intensity={isMobile ? 0.4 : 0.6}
        mipmapBlur
      />
    </EffectComposer>
  );
}
