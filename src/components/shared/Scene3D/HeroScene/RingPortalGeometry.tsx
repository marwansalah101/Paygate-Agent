"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { PORTAL_RINGS, RING_COLORS, type RingConfig } from "./heroSceneConfig";

/** Individual 3D Glowing Torus Ring */
function PortalRingMesh({
  config,
  scrollExpansion = 0,
}: {
  config: RingConfig;
  scrollExpansion?: number;
}) {
  const scaledRadius = config.radius * (1 + scrollExpansion * 0.4);

  const geometry = useMemo(() => {
    return new THREE.TorusGeometry(scaledRadius, config.tube, 32, 100);
  }, [scaledRadius, config.tube]);

  const wireGeometry = useMemo(() => {
    return new THREE.EdgesGeometry(geometry);
  }, [geometry]);

  return (
    <group
      position={[0, 0, -config.z * 15]}
      rotation={[config.rotationX, config.rotationY, 0]}
    >
      {/* Semi-translucent 3D Torus Body */}
      <mesh geometry={geometry}>
        <meshBasicMaterial
          color={config.color}
          transparent
          opacity={0.5}
          side={THREE.DoubleSide}
          toneMapped={false}
        />
      </mesh>

      {/* Glowing Outer Edge Outline */}
      <lineSegments geometry={wireGeometry}>
        <lineBasicMaterial
          color={config.borderColor}
          transparent
          opacity={0.8}
          toneMapped={false}
        />
      </lineSegments>
    </group>
  );
}

/** Ambient Floating Light Nodes */
function AmbientLightNodes() {
  const nodes = useMemo(() => {
    const count = 16;
    return Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2;
      const radius = 2.8 + (i % 3) * 1.2;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      const z = (Math.sin(i * 1.5) - 0.5) * 5;
      const size = 0.08 + (i % 2) * 0.06;
      const color = i % 2 === 0 ? RING_COLORS.ringGlow : RING_COLORS.ringInner;
      return { x, y, z, size, color };
    });
  }, []);

  return (
    <group>
      {nodes.map((node, i) => (
        <mesh key={i} position={[node.x, node.y, node.z]}>
          <sphereGeometry args={[node.size, 16, 16]} />
          <meshBasicMaterial color={node.color} transparent opacity={0.8} toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}

/** The Full Concentric 3D AI Portal Ring Assembly */
export function RingPortalGeometry({
  scrollExpansion = 0,
}: {
  scrollExpansion?: number;
}) {
  return (
    <group position={[0, 0, -5]}>
      {PORTAL_RINGS.map((ring) => (
        <PortalRingMesh key={ring.id} config={ring} scrollExpansion={scrollExpansion} />
      ))}
      <AmbientLightNodes />
    </group>
  );
}
