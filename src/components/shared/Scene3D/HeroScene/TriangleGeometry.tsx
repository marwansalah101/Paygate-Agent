"use client";

import { useMemo } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import {
  BOTTOM_TRIANGLES,
  CORNER_TRIANGLES,
  OUTLINE_TRIANGLE,
  RIBBON,
  type FlatTriangle,
  type PctPoint,
} from "./heroSceneConfig";

/** Multiplier turning a shape's small 0..1 "z" depth knob into world units
 *  the orthographic camera can actually separate. */
const Z_SCALE = 60;

/** Viewport-fraction (0..1, y-down, top-left origin) → world space (origin
 *  center, y-up) — the orthographic camera in HeroScene maps 1 world unit
 *  to 1 CSS pixel, so this is the only place viewport math happens. */
export function toWorld(p: PctPoint, width: number, height: number): [number, number] {
  return [(p.x - 0.5) * width, (0.5 - p.y) * height];
}

function useTriangleGeometry(points: [PctPoint, PctPoint, PctPoint]) {
  const { width, height } = useThree((state) => state.size);

  return useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const verts = new Float32Array(9);
    points.forEach((p, i) => {
      const [x, y] = toWorld(p, width, height);
      verts[i * 3] = x;
      verts[i * 3 + 1] = y;
      verts[i * 3 + 2] = 0;
    });
    geometry.setAttribute("position", new THREE.BufferAttribute(verts, 3));
    geometry.setIndex([0, 1, 2]);
    return geometry;
  }, [points, width, height]);
}

function TriangleMesh({ shape }: { shape: FlatTriangle }) {
  const geometry = useTriangleGeometry(shape.points);

  return (
    <mesh geometry={geometry} position={[0, 0, -shape.z * Z_SCALE]} frustumCulled={false}>
      <meshBasicMaterial color={shape.color} side={THREE.DoubleSide} toneMapped={false} />
    </mesh>
  );
}

/** Upper-right corner: the dominant gray triangle plus the dark wedge that
 *  carves its inner edge against the gradient background. */
export function CornerTriangles() {
  return (
    <>
      {CORNER_TRIANGLES.map((shape) => (
        <TriangleMesh key={shape.id} shape={shape} />
      ))}
    </>
  );
}

/** Bottom-left corner: small white + light-blue pair. */
export function BottomTriangles() {
  return (
    <>
      {BOTTOM_TRIANGLES.map((shape) => (
        <TriangleMesh key={shape.id} shape={shape} />
      ))}
    </>
  );
}

/** Thin stroke-only triangle layered near the ribbon — an outline, not a
 *  filled face, so it's built from a line loop instead of a mesh. */
export function OutlineTriangle() {
  const { width, height } = useThree((state) => state.size);

  const geometry = useMemo(() => {
    const pts = OUTLINE_TRIANGLE.points.map((p) => {
      const [x, y] = toWorld(p, width, height);
      return new THREE.Vector3(x, y, 0);
    });
    return new THREE.BufferGeometry().setFromPoints([...pts, pts[0]]);
  }, [width, height]);

  return (
    <lineLoop
      geometry={geometry}
      position={[0, 0, -OUTLINE_TRIANGLE.z * Z_SCALE]}
      renderOrder={1}
      frustumCulled={false}
    >
      {/* depthTest off: this traces the ribbon's own silhouette, so at equal
          screen pixels it would otherwise lose the z-test to the ribbon
          faces beneath it and disappear entirely. It's a highlight line,
          not occluded geometry — it should always draw on top. */}
      <lineBasicMaterial
        color={OUTLINE_TRIANGLE.color}
        transparent
        opacity={0.8}
        depthTest={false}
        toneMapped={false}
      />
    </lineLoop>
  );
}

/** The folded-ribbon/chevron: a fan of `bandCount` triangle "flags," each
 *  sharing the apex point and a staggered origin edge on the left, colored
 *  light → deep blue back to front — reads as a giant folded arrowmark
 *  instead of a single flat polygon. Generated from heroSceneConfig's knobs
 *  rather than hand-listed vertices so the fan is easy to retune. */
export function RibbonFan() {
  const { width, height } = useThree((state) => state.size);

  const bands = useMemo(() => {
    const { bandCount, originX, spanTopY, spanBottomY, apexX, apexY, fanSpread, colors, z } = RIBBON;
    const span = spanBottomY - spanTopY;

    return Array.from({ length: bandCount }, (_, i) => {
      const t0 = i / bandCount;
      const t1 = (i + 1) / bandCount;
      const stagger = fanSpread * i;

      const top: PctPoint = { x: originX + stagger, y: spanTopY + span * t0 };
      const bottom: PctPoint = { x: originX + stagger, y: spanTopY + span * t1 };
      const apex: PctPoint = { x: apexX, y: apexY };

      const [tx, ty] = toWorld(top, width, height);
      const [bx, by] = toWorld(bottom, width, height);
      const [ax, ay] = toWorld(apex, width, height);

      const verts = new Float32Array([tx, ty, 0, bx, by, 0, ax, ay, 0]);
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.BufferAttribute(verts, 3));
      geometry.setIndex([0, 1, 2]);

      // Slight per-band z stagger keeps draw order deterministic where
      // adjacent fan blades overlap near the shared apex.
      return { geometry, color: colors[i % colors.length], z: -(z + i * 0.02) * Z_SCALE };
    });
  }, [width, height]);

  return (
    <>
      {bands.map((band, i) => (
        <mesh key={i} geometry={band.geometry} position={[0, 0, band.z]} frustumCulled={false}>
          <meshBasicMaterial color={band.color} side={THREE.DoubleSide} toneMapped={false} />
        </mesh>
      ))}
    </>
  );
}
