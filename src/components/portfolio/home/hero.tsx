'use client'

import { Canvas } from '@react-three/fiber'
import React, { useEffect, useState } from 'react'
import Current from './current';

// import { Bloom, DepthOfField, EffectComposer,ChromaticAberration , Noise, Vignette, ColorAverage, DotScreen, Scanline, SelectiveBloom, Glitch } from '@react-three/postprocessing'


export default function Hero() {
  // const [loaded, setloaded] = useState(false)

  // useEffect(()=>(
  //   setloaded(true)
  // ),[])

  // if(!loaded) return null

  return (
    <div id="canvas-container" className="fixed  top-0 left-0 z-0 h-full w-full">
      <Canvas className='z-0' camera={{ fov: 40, near: 0.1, far: 1000, position: [0, 0, 5.5] }}>
        <ambientLight intensity={0.1} />
        <directionalLight color="white" position={[0, 0, 5]} />
        <Current number={10000} />
      </Canvas>
    </div>
  );
}
