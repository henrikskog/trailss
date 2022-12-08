import {
  ContactShadows,
  Environment,
  OrbitControls,
  useGLTF,

  Bounds
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { useState } from "react";
import { useAnimationFrame } from "./useAnimationFrame";
import { Model } from "./CaminoModel";


interface Props {
  position: number[];
  rotation: [number, number, number]
}


export default function Camino() {
  const [rotation, setRotation] = useState<[number, number, number]>([-1.3, 0.2, Math.PI+1])
  const ROT_SPEED = 0.002

  // Function that gets ran for every frame in animation loop. Deltatime is the time since the function was last called.
  const animate = () =>{
      // Pass on a function to the setter of the state
      // to make sure we always have the latest state
      setRotation((prevRotation) => {
        const [px, py, pz] = prevRotation

        return [px+0, py-0.0005, pz+ROT_SPEED]
      })

  }

    useAnimationFrame(animate, 30)

  return (
    <Canvas camera={{ position: [4, 0, 0], fov: 50 }}>
    <Bounds  fit clip damping={4} margin={0.9}>
      <ambientLight intensity={0.2} />
      
      <Model rotation={[-1, 5, -0.7]} scale={0.7} position={[0, 0, 0]}  />
      
      <Environment preset="forest" />
      {/* @ts-ignore */}
      <ContactShadows
        frames={1}
        scale={5}
        position={[0, -0.9, -2]}
        far={1}
        blur={5}
        opacity={0}
        color="#204080"
      />

      </Bounds>
    </Canvas>
  );
}
