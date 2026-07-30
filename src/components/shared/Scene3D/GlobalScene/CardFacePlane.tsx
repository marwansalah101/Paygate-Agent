"use client";

import { useEffect, useMemo } from "react";
import { createCardFaceTexture } from "./createCardFaceTexture";
import { CARD_WIDTH, CARD_HEIGHT, CARD_DEPTH } from "./CardBody";

/**
 * A thin unlit decal plane mounted just proud of the body's front face —
 * kept separate from CardBody rather than fighting RoundedBox's single
 * bevelled-extrude geometry for per-face materials. Unlit (meshBasicMaterial)
 * because printed ink doesn't carry the plastic's specular sheen; only the
 * body's clearcoat should react to light, and this plane should stay crisp
 * even though the body underneath is now semi-transparent.
 */
export function CardFacePlane() {
  const texture = useMemo(() => createCardFaceTexture(), []);

  useEffect(() => () => texture.dispose(), [texture]);

  return (
    <mesh position={[0, 0, CARD_DEPTH / 2 + 0.004]} renderOrder={1}>
      <planeGeometry args={[CARD_WIDTH * 0.965, CARD_HEIGHT * 0.965]} />
      <meshBasicMaterial map={texture} transparent depthWrite={false} toneMapped={false} />
    </mesh>
  );
}
