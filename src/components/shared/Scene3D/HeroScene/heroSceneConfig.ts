/* =========================================================
   Hero 3D scene — Folded-arrow background graphic shared tunables.
   ========================================================= */

export const CAMERA_POSITION: [number, number, number] = [0, 0, 10];

export interface PctPoint {
  x: number;
  y: number;
}

export interface FlatTriangle {
  id: string;
  points: [PctPoint, PctPoint, PctPoint];
  color: string;
  z: number;
}

export const RIBBON = {
  bandCount: 5,
  originX: 0.08,
  spanTopY: 0.12,
  spanBottomY: 0.92,
  apexX: 0.44,
  apexY: 0.52,
  fanSpread: 0.02,
  colors: ["#60a5fa", "#3b82f6", "#2563eb", "#1d4ed8", "#1e40af"],
  z: 0.2,
};

export const RIBBON_MOBILE = {
  bandCount: 5,
  originX: 0.04,
  spanTopY: 0.30,
  spanBottomY: 0.70,
  apexX: 0.62,
  apexY: 0.50,
  fanSpread: 0.02,
  colors: ["#60a5fa", "#3b82f6", "#2563eb", "#1d4ed8", "#1e40af"],
  z: 0.2,
};

export const CORNER_TRIANGLES: FlatTriangle[] = [
  {
    id: "corner-main",
    points: [
      { x: 0.72, y: -0.05 },
      { x: 1.05, y: -0.05 },
      { x: 0.98, y: 0.48 },
    ],
    color: "#2563eb",
    z: 0.35,
  },
  {
    id: "corner-sub",
    points: [
      { x: 0.82, y: -0.05 },
      { x: 1.05, y: 0.15 },
      { x: 0.92, y: 0.35 },
    ],
    color: "#1d4ed8",
    z: 0.3,
  },
];

export const CORNER_TRIANGLES_MOBILE: FlatTriangle[] = [
  {
    id: "corner-main",
    points: [
      { x: 0.65, y: -0.05 },
      { x: 1.08, y: -0.05 },
      { x: 0.98, y: 0.32 },
    ],
    color: "#2563eb",
    z: 0.35,
  },
  {
    id: "corner-sub",
    points: [
      { x: 0.75, y: -0.05 },
      { x: 1.08, y: 0.10 },
      { x: 0.92, y: 0.24 },
    ],
    color: "#1d4ed8",
    z: 0.3,
  },
];

export const BOTTOM_TRIANGLES: FlatTriangle[] = [
  {
    id: "bottom-white",
    points: [
      { x: -0.05, y: 0.65 },
      { x: 0.18, y: 0.98 },
      { x: -0.05, y: 1.05 },
    ],
    color: "#ffffff",
    z: 0.15,
  },
  {
    id: "bottom-cyan",
    points: [
      { x: 0.02, y: 0.72 },
      { x: 0.25, y: 1.02 },
      { x: -0.02, y: 1.05 },
    ],
    color: "#38bdf8",
    z: 0.1,
  },
];

export const BOTTOM_TRIANGLES_MOBILE: FlatTriangle[] = [
  {
    id: "bottom-white",
    points: [
      { x: -0.05, y: 0.80 },
      { x: 0.32, y: 1.05 },
      { x: -0.05, y: 1.05 },
    ],
    color: "#ffffff",
    z: 0.15,
  },
  {
    id: "bottom-cyan",
    points: [
      { x: -0.02, y: 0.84 },
      { x: 0.38, y: 1.05 },
      { x: -0.02, y: 1.05 },
    ],
    color: "#38bdf8",
    z: 0.1,
  },
];

export const OUTLINE_TRIANGLE = {
  points: [
    { x: 0.05, y: 0.18 } as PctPoint,
    { x: 0.42, y: 0.52 } as PctPoint,
    { x: 0.12, y: 0.88 } as PctPoint,
  ],
  color: "#38bdf8",
  z: 0.4,
};

export const OUTLINE_TRIANGLE_MOBILE = {
  points: [
    { x: 0.03, y: 0.30 } as PctPoint,
    { x: 0.60, y: 0.50 } as PctPoint,
    { x: 0.08, y: 0.70 } as PctPoint,
  ],
  color: "#38bdf8",
  z: 0.4,
};

export const IDLE_POSITION_AMPLITUDE = 0.02;
export const IDLE_ROTATION_AMPLITUDE = 0.01;
export const IDLE_PERIODS: [number, number, number] = [10, 8, 12];
export const IDLE_PHASE_OFFSETS: [number, number, number] = [0, 1.8, 3.9];

export const POINTER_PARALLAX_MAX = 0.04;
export const POINTER_PARALLAX_DAMPING = 3.5;

