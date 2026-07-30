"use client";

const BLUE = "#2e7df5";

export function SceneLighting() {
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[3, 4, 5]} intensity={1.1} color="#eaf2ff" />
      <directionalLight position={[-3, -2, -3]} intensity={0.7} color={BLUE} />
      {/* Near-camera point light so the card's clearcoat highlight visibly
          sweeps across its flat faces as it tumbles — the prior two-light
          rig was tuned for the transmissive torus-knot, not flat clearcoat. */}
      <pointLight position={[0, 0, 5]} intensity={0.35} color="#eaf2ff" />
    </>
  );
}
