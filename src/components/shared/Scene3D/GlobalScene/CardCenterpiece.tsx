"use client";

import { CardBody } from "./CardBody";
import { CardFacePlane } from "./CardFacePlane";

/**
 * Swap boundary successor to PlaceholderGeometry: renders geometry +
 * material at the local origin with zero transform props — all motion is
 * owned by CenterpieceObject's groups.
 */
export function CardCenterpiece() {
  return (
    <>
      <CardBody />
      <CardFacePlane />
    </>
  );
}
