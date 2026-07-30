"use client";

import { RoundedBox } from "@react-three/drei";

const CARD_BLUE_DEEP = "#1a56c4"; // mirrors --color-blue-card-deep
const BLUE = "#2e7df5"; // mirrors --color-blue-primary — emissive glow to match BloomEffects

// Real ISO card ratio (85.6mm x 53.98mm ≈ 1.586:1), scaled up from the card's
// original small-Hero-canvas size to read at the same visual weight as the
// torus-knot centerpiece it replaces (camera is further away here). Depth
// stays proportionally thick — a stylized "3D product render" convention —
// and well under depth/2 for RoundedBox's bevel math.
export const CARD_WIDTH = 2.0;
export const CARD_HEIGHT = 1.261;
export const CARD_DEPTH = 0.15;

export function CardBody() {
  return (
    <RoundedBox args={[CARD_WIDTH, CARD_HEIGHT, CARD_DEPTH]} radius={0.06} smoothness={4} bevelSegments={3}>
      <meshPhysicalMaterial
        color={CARD_BLUE_DEEP}
        roughness={0.28}
        metalness={0.15}
        clearcoat={1}
        clearcoatRoughness={0.12}
        transparent
        opacity={0.78}
        emissive={BLUE}
        emissiveIntensity={0.15}
      />
    </RoundedBox>
  );
}
