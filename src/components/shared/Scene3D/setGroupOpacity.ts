import * as THREE from "three";

/** Scales each material's own authored opacity by `factor` instead of
 *  overwriting it outright — some materials in these scenes are deliberately
 *  semi-transparent at rest (e.g. the outline triangle at 0.45, the card body
 *  at 0.78), which a flat overwrite would stomp back to fully opaque whenever
 *  factor is 1. */
export function setGroupOpacity(group: THREE.Group, factor: number) {
  group.traverse((child) => {
    if (child instanceof THREE.Mesh || child instanceof THREE.Line) {
      const material = child.material as THREE.Material & { opacity: number };
      if (material.userData.baseOpacity === undefined) {
        material.userData.baseOpacity = material.opacity;
      }
      material.transparent = true;
      material.opacity = material.userData.baseOpacity * factor;
    }
  });
}
