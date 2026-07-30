"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { GLASS_NODES, type GlassNodeConfig } from "./heroSceneConfig";

/** Individual 3D Frosted Glass Node Card */
function GlassCardMesh({ config }: { config: GlassNodeConfig }) {
  const boxGeometry = useMemo(() => {
    return new THREE.BoxGeometry(config.width, config.height, 0.06);
  }, [config.width, config.height]);

  const edgesGeometry = useMemo(() => {
    return new THREE.EdgesGeometry(boxGeometry);
  }, [boxGeometry]);

  return (
    <group
      position={[config.x, config.y, config.z]}
      rotation={[config.rotationX, config.rotationY, config.rotationZ]}
    >
      {/* Frosted Glass Fill */}
      <mesh geometry={boxGeometry}>
        <meshBasicMaterial
          color={config.color}
          transparent
          opacity={config.opacity}
          side={THREE.DoubleSide}
          toneMapped={false}
        />
      </mesh>

      {/* Glowing Neon Rim Edges */}
      <lineSegments geometry={edgesGeometry}>
        <lineBasicMaterial
          color={config.borderColor}
          transparent
          opacity={0.85}
          toneMapped={false}
        />
      </lineSegments>
    </group>
  );
}

/** Laser Light Beams connecting glass nodes */
function ConnectingLaserBeams() {
  const lineGeometry = useMemo(() => {
    const leftMain = GLASS_NODES[0];
    const leftChip = GLASS_NODES[2];
    const rightMain = GLASS_NODES[3];
    const rightChip = GLASS_NODES[5];

    const points = [
      // Left side connecting beam
      new THREE.Vector3(leftMain.x, leftMain.y, leftMain.z),
      new THREE.Vector3(leftChip.x, leftChip.y, leftChip.z),
      // Right side connecting beam
      new THREE.Vector3(rightMain.x, rightMain.y, rightMain.z),
      new THREE.Vector3(rightChip.x, rightChip.y, rightChip.z),
    ];

    return new THREE.BufferGeometry().setFromPoints(points);
  }, []);

  return (
    <lineSegments geometry={lineGeometry}>
      <lineBasicMaterial color="#38bdf8" transparent opacity={0.4} toneMapped={false} />
    </lineSegments>
  );
}

/** Full 3D Frosted Glass FinTech Node Composition */
export function GlassNodeGeometry() {
  return (
    <group position={[0, 0, 0]}>
      {GLASS_NODES.map((node) => (
        <GlassCardMesh key={node.id} config={node} />
      ))}
      <ConnectingLaserBeams />
    </group>
  );
}
