'use client'
import { Canvas } from '@react-three/fiber'
import React, { Suspense } from 'react'
import Lighting from './_components/lighting';
import ArcherStage from './_components/stage';
import { OrbitControls } from '@react-three/drei';
import { FloorPlane} from './_components/floor';
import { Physics, RigidBody, CuboidCollider } from "@react-three/rapier";
import { Box, Torus } from "@react-three/drei";
import TargetModel from './_components/target';
import Experience from './_components/stage';
export default function Page() {
  return (
    <div id="archer-canvas-container" className="h-screen w-screen">
      <Canvas
        shadows
        gl={{ antialias: false }}
        dpr={[1, 1.5]}
        camera={{ position: [50, 0, 300], fov: 45, near: 0.5, far: 10000 }}
      >
        <color attach="background" args={["skyblue"]} />
        <Lighting />
        <Suspense>
          <Experience/>
        </Suspense>
        <OrbitControls
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 1.9}
          makeDefault
        />
      </Canvas>
    </div>
  );
}
