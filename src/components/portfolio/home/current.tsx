'use client'

import React, { useMemo, useRef } from 'react'
import {  CatmullRomCurve3, DoubleSide,  Euler,  FrontSide,  RepeatWrapping, type ShaderMaterial, TextureLoader, Vector3, Vector4 } from 'three';
// import {GodRaysFakeSunShader} from 'three-stdlib'

import fragmentShader  from '../../../shaders/current/fragment.glsl'
import vertexShader from '../../../shaders/current/vertexParticles.glsl'

import { useFrame} from '@react-three/fiber';
import normals from "./bZIDP.png";
import dust from "./photoshop-dust-free-271613555246.jpg";
import caustic from "./causticwater.jpg";


import fragTube from "../../../shaders/current/fragTube.glsl" 
import vertTube from "../../../shaders/current/vertTube.glsl";
import fragGodRay from "../../../shaders/current/fragGodRay.glsl";
import vertGodRay from "../../../shaders/current/vertGodRay.glsl";

type currentProps = {
  number?:number
}

export default function Current({number = 1000}:currentProps) {

  const pointShaderRef = useRef<ShaderMaterial>(null);
  const tubeShaderRef = useRef<ShaderMaterial>(null);
  const godRayShaderRef = useRef<ShaderMaterial>(null);

  const [positions, randoms, sizes, points] = useMemo(() => {
    const positions = new Float32Array(number * 3);
    const randoms = new Float32Array(number * 3);
    const sizes = new Float32Array(number * 1);
    const points: Vector3[] = [];

    for (let i = 0; i < number * 3; i += 3) {
      positions[i + 0] = Math.random() - 0.5;
      positions[i + 1] = Math.random() - 0.5;
      positions[i + 2] = Math.random() - 0.5;

      randoms[i + 0] = Math.random();
      randoms[i + 1] = Math.random();
      randoms[i + 2] = Math.random();

      sizes[i + 0] = 0.5 + 0.5 * Math.random();
    }

    for(let i = 0; i<100;i++){
      const angle = 2*Math.PI*i/100
      const x = Math.sin(angle) + 2.0 * Math.sin(2.0 * angle);
      const y = Math.cos(angle) - 2.0 * Math.cos(2.0 * angle);
      const z = -Math.sin(3.0 * angle);

      points.push(new Vector3(x,y,z))
    }
    return [positions, randoms, sizes, points];
  }, [number]);

  const [dotsTexture, stripeTexture] = useMemo(() => {
    const dotsTexture = new TextureLoader().load(dust.src);
    const stripeTexture = new TextureLoader().load(caustic.src);

    dotsTexture.wrapS = RepeatWrapping;
    dotsTexture.wrapT = RepeatWrapping;
    stripeTexture.wrapS = RepeatWrapping;
    stripeTexture.wrapT = RepeatWrapping;

    return [dotsTexture, stripeTexture];
  }, []);

  // console.log(vertTube)
  // console.log("dust: ", dotsTexture);
  useFrame(({clock})=>{
    
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    pointShaderRef.current.uniforms.time.value = clock.elapsedTime + 1
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    tubeShaderRef.current.uniforms.time.value = clock.elapsedTime + 100
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    godRayShaderRef.current.uniforms.time.value = clock.elapsedTime + 100
  })

  return (
    <>
            <mesh>
              <planeGeometry args={[20, 20, 10, 10]} />
              <shaderMaterial
                ref={godRayShaderRef}
                // extensions={{
                //   derivatives: true, // "extension GL_OES_standard_derivatives: enable"
                //   fragDepth: false,
                //   drawBuffers: false,
                //   shaderTextureLOD: false,
                // }}
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                fragmentShader={fragGodRay}
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                vertexShader={vertGodRay}
                side={FrontSide}
                transparent={true}
                depthTest={false}
                uniforms={{
                  time: { value: 1 },
                  resolution: { value: new Vector4() },
                  udots: { value: dotsTexture },
                  ustripes: { value: stripeTexture },
                  uNoise: { value: stripeTexture },
                }}
              />
            </mesh>
      <points rotation={new Euler(Math.PI * 1.55, 0, Math.PI * 0.5)}>
        <bufferGeometry>
          <bufferAttribute
            attach={"attributes-position"}
            array={positions}
            count={number}
            itemSize={3}
          />
          <bufferAttribute
            attach={"attributes-aRandom"}
            array={randoms}
            itemSize={3}
          />
          <bufferAttribute
            attach={"attributes-size"}
            array={sizes}
            itemSize={1}
          />
        </bufferGeometry>
        <shaderMaterial
          ref={pointShaderRef}
          extensions={{
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            derivatives: true, // "extension GL_OES_standard_derivatives: enable"
            fragDepth: false,
            drawBuffers: false,
            shaderTextureLOD: false,
          }}
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          fragmentShader={fragmentShader}
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          vertexShader={vertexShader}
          side={DoubleSide}
          transparent={true}
          depthTest={false}
          uniforms={{
            time: { value: 1 },
            resolution: { value: new Vector4() },
            texture1: { value: new TextureLoader().load(normals.src) },
          }}
        />
      </points>
      <mesh rotation={new Euler(Math.PI * 1.55, 0, Math.PI * 0.5)}>
        <tubeGeometry
          args={[new CatmullRomCurve3(points), 100, 0.4, 100, true]}
        />
        <shaderMaterial
          ref={tubeShaderRef}
          // extensions={{
          //   derivatives: true,  "extension GL_OES_standard_derivatives: enable"
          //   fragDepth: false,
          //   drawBuffers: false,
          //   shaderTextureLOD: false,
          // }}
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          fragmentShader={fragTube}
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          vertexShader={vertTube}
          side={DoubleSide}
          transparent={true}
          depthTest={false}
          uniforms={{
            time: { value: 1 },
            resolution: { value: new Vector4() },
            udots: { value: dotsTexture },
            ustripes: { value: stripeTexture },
          }}
        />
      </mesh>
    </>
  );
}
