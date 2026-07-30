"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { ORB_CONFIG } from "./heroSceneConfig";

/** Individual 3D Spiraling Ribbon Fin Blade */
function RibbonFinMesh({
  index,
  totalFins,
}: {
  index: number;
  totalFins: number;
}) {
  const { radius, thickness, twistAngle, curveSegments } = ORB_CONFIG;

  const { geometry, position, rotation } = useMemo(() => {
    const u = index / (totalFins - 1) - 0.5;
    const lat = u * Math.PI * 0.88;

    const sliceRadius = Math.max(0.3, radius * Math.cos(lat));
    const yPos = radius * Math.sin(lat) * 0.9;

    const innerR = sliceRadius * 0.3;
    const outerR = sliceRadius * 1.15;
    const spinAngle = u * twistAngle;

    const shape = new THREE.Shape();
    const arcLength = Math.PI * 1.65;
    const segments = curveSegments;

    for (let i = 0; i <= segments; i++) {
      const a = (i / segments) * arcLength;
      const r = outerR * (1 + 0.08 * Math.sin(a * 3));
      const x = Math.cos(a) * r;
      const y = Math.sin(a) * r;
      if (i === 0) shape.moveTo(x, y);
      else shape.lineTo(x, y);
    }

    for (let i = segments; i >= 0; i--) {
      const a = (i / segments) * arcLength;
      const r = innerR;
      const x = Math.cos(a) * r;
      const y = Math.sin(a) * r;
      shape.lineTo(x, y);
    }

    shape.closePath();

    const geom = new THREE.ExtrudeGeometry(shape, {
      depth: thickness,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 0.03,
      bevelThickness: 0.03,
    });
    geom.center();

    const rotX = Math.PI / 2 + u * 0.4;
    const rotY = spinAngle;
    const rotZ = 0.25;

    return {
      geometry: geom,
      position: [0, yPos, 0] as [number, number, number],
      rotation: [rotX, rotY, rotZ] as [number, number, number],
    };
  }, [index, totalFins, radius, thickness, twistAngle, curveSegments]);

  return (
    <mesh geometry={geometry} position={position} rotation={rotation}>
      <meshPhysicalMaterial
        color={ORB_CONFIG.baseColor}
        roughness={ORB_CONFIG.roughness}
        metalness={ORB_CONFIG.metalness}
        clearcoat={ORB_CONFIG.clearcoat}
        clearcoatRoughness={ORB_CONFIG.clearcoatRoughness}
        iridescence={ORB_CONFIG.iridescence}
        iridescenceIOR={ORB_CONFIG.iridescenceIOR}
        iridescenceThicknessRange={[120, 380]}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

/** Complete 3D Iridescent Twisted Ribbon Orb Assembly */
export function SpiralRibbonOrbGeometry() {
  const finCount = ORB_CONFIG.finCount;

  return (
    <group position={[0, 0, -2]} scale={[0.6, 0.6, 0.6]}>
      {Array.from({ length: finCount }, (_, i) => (
        <RibbonFinMesh key={i} index={i} totalFins={finCount} />
      ))}
    </group>
  );
}
