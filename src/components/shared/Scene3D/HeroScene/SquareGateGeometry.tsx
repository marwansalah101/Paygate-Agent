"use client";

import { useMemo } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import {
  CORNER_SQUARES,
  GATE_COLORS,
  type PctPoint,
  type SquareFrameConfig,
} from "./heroSceneConfig";

const Z_SCALE = 50;

export function toWorld(p: PctPoint, width: number, height: number): [number, number] {
  return [(p.x - 0.5) * width, (0.5 - p.y) * height];
}

/** Floating 3D Square Frame component */
function SquareFrameMesh({ shape }: { shape: SquareFrameConfig }) {
  const { width, height } = useThree((state) => state.size);

  const [worldX, worldY] = useMemo(() => {
    return toWorld({ x: shape.x, y: shape.y }, width, height);
  }, [shape.x, shape.y, width, height]);

  const sizePx = shape.size * Math.min(width, height);

  const fillGeometry = useMemo(() => {
    return new THREE.PlaneGeometry(sizePx, sizePx);
  }, [sizePx]);

  const edgesGeometry = useMemo(() => {
    return new THREE.EdgesGeometry(new THREE.PlaneGeometry(sizePx, sizePx));
  }, [sizePx]);

  return (
    <group
      position={[worldX, worldY, -shape.z * Z_SCALE]}
      rotation={[0, 0, shape.rotation]}
    >
      {/* Semi-translucent glass fill */}
      <mesh geometry={fillGeometry}>
        <meshBasicMaterial
          color={shape.color}
          transparent
          opacity={0.7}
          side={THREE.DoubleSide}
          toneMapped={false}
        />
      </mesh>
      {/* Glowing border line */}
      <lineSegments geometry={edgesGeometry}>
        <lineBasicMaterial
          color={shape.borderColor}
          transparent
          opacity={0.9}
          linewidth={2}
          toneMapped={false}
        />
      </lineSegments>
    </group>
  );
}

/** Top-Right Corner Square Assemblies */
export function CornerSquareGroup() {
  const cornerItems = useMemo(
    () => CORNER_SQUARES.filter((s) => s.id.startsWith("tr")),
    []
  );

  return (
    <>
      {cornerItems.map((shape) => (
        <SquareFrameMesh key={shape.id} shape={shape} />
      ))}
    </>
  );
}

/** Bottom-Left Corner Square Assemblies */
export function BottomSquareGroup() {
  const bottomItems = useMemo(
    () => CORNER_SQUARES.filter((s) => s.id.startsWith("bl")),
    []
  );

  return (
    <>
      {bottomItems.map((shape) => (
        <SquareFrameMesh key={shape.id} shape={shape} />
      ))}
    </>
  );
}

/**
 * The Central 3D "Paygate" Portal:
 * Includes the outer square frame, inner portal light glow, and two 3D sliding gate doors.
 */
export function CentralPaygatePortal({
  doorOpenProgress = 0,
}: {
  doorOpenProgress?: number;
}) {
  const { width, height } = useThree((state) => state.size);

  const gateWidth = Math.min(width * 0.48, 520);
  const gateHeight = Math.min(height * 0.42, 420);
  const doorWidth = gateWidth / 2;

  // Geometry for gate doors
  const doorGeometry = useMemo(() => {
    return new THREE.PlaneGeometry(doorWidth, gateHeight);
  }, [doorWidth, gateHeight]);

  // Geometry for outer frame edges
  const outerFrameEdges = useMemo(() => {
    return new THREE.EdgesGeometry(new THREE.PlaneGeometry(gateWidth + 24, gateHeight + 24));
  }, [gateWidth, gateHeight]);

  const innerFrameEdges = useMemo(() => {
    return new THREE.EdgesGeometry(new THREE.PlaneGeometry(gateWidth, gateHeight));
  }, [gateWidth, gateHeight]);

  // Seam line geometry down center where doors meet
  const seamGeometry = useMemo(() => {
    const points = [
      new THREE.Vector3(0, gateHeight / 2, 0.1),
      new THREE.Vector3(0, -gateHeight / 2, 0.1),
    ];
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [gateHeight]);

  // Slide offset calculation based on scroll open progress
  const slideOffset = doorOpenProgress * (gateWidth * 0.45);

  return (
    <group position={[0, 0, -10]}>
      {/* Outer Square Gateway Frame Edges */}
      <lineSegments geometry={outerFrameEdges}>
        <lineBasicMaterial color={GATE_COLORS.laserGlow} transparent opacity={0.6} toneMapped={false} />
      </lineSegments>

      <lineSegments geometry={innerFrameEdges}>
        <lineBasicMaterial color={GATE_COLORS.laserSeam} transparent opacity={0.85} toneMapped={false} />
      </lineSegments>

      {/* Recessed Portal Glow Backplate */}
      <mesh position={[0, 0, -5]}>
        <planeGeometry args={[gateWidth + 20, gateHeight + 20]} />
        <meshBasicMaterial color={GATE_COLORS.frameInner} transparent opacity={0.35} toneMapped={false} />
      </mesh>

      {/* Left Gate Door Panel */}
      <group position={[-doorWidth / 2 - slideOffset, 0, 0]}>
        <mesh geometry={doorGeometry}>
          <meshBasicMaterial
            color={GATE_COLORS.doorPanelLeft}
            transparent
            opacity={0.4}
            side={THREE.DoubleSide}
            toneMapped={false}
          />
        </mesh>
        <lineSegments geometry={new THREE.EdgesGeometry(doorGeometry)}>
          <lineBasicMaterial color={GATE_COLORS.laserGlow} transparent opacity={0.85} toneMapped={false} />
        </lineSegments>
      </group>

      {/* Right Gate Door Panel */}
      <group position={[doorWidth / 2 + slideOffset, 0, 0]}>
        <mesh geometry={doorGeometry}>
          <meshBasicMaterial
            color={GATE_COLORS.doorPanelRight}
            transparent
            opacity={0.4}
            side={THREE.DoubleSide}
            toneMapped={false}
          />
        </mesh>
        <lineSegments geometry={new THREE.EdgesGeometry(doorGeometry)}>
          <lineBasicMaterial color={GATE_COLORS.laserGlow} transparent opacity={0.85} toneMapped={false} />
        </lineSegments>
      </group>

      {/* Glowing Seam Line at Center (fades as doors open) */}
      <line geometry={seamGeometry}>
        <lineBasicMaterial
          color={GATE_COLORS.laserSeam}
          transparent
          opacity={Math.max(0, 0.9 - doorOpenProgress * 1.5)}
          toneMapped={false}
        />
      </line>
    </group>
  );
}
