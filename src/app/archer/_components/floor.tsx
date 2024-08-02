
import {  usePlane  } from "@react-three/cannon";

import type { Group, Material, Mesh, Object3D, SpotLight } from "three";
import type {
  ConeTwistConstraintOpts,
  PlaneProps,
  Triplet,
} from "@react-three/cannon";
import type {
  BoxGeometryProps,
  MeshProps,
  MeshStandardMaterialProps,
  ThreeEvent,
} from "@react-three/fiber";
import { useRef } from "react";


function FloorPlane(props: PlaneProps) {
  const [ref] = usePlane(() => ({ ...props }), useRef<Mesh>(null))
  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[1000, 1000]} />
      <meshStandardMaterial color='red' />
    </mesh>
  )
}

export { FloorPlane}