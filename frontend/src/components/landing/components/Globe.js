import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useGLTF, Html, OrbitControls, Environment, ContactShadows } from '@react-three/drei'
import urlGlobe from './scene.gltf';

function Model(props) {
  /*
  Auto-generated by: https://github.com/pmndrs/gltfjsx
  author: JasperTobias (https://sketchfab.com/JasperTobias)
  license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
  source: https://sketchfab.com/3d-models/lowpoly-earth-ce0cce9b528b47c7984bf0b2b600d705
  title: LowPoly Earth
  */
  const { nodes, materials } = useLoader(GLTFLoader, urlGlobe)
  return (
    <group rotation={[-Math.PI / 2, 0, Math.PI]} {...props} dispose={null}>
      <mesh geometry={nodes['URF-Height_Lampd_Ice_0'].geometry} material={materials.Lampd_Ice} />
      <mesh geometry={nodes['URF-Height_watr_0'].geometry} material={materials.watr} material-roughness={0} />
      <mesh geometry={nodes['URF-Height_Lampd_0'].geometry} material={materials.Lampd} material-color="lightgreen">
      </mesh>
    </group>
  )
}


export default function Viewer() {
  return (
    <Canvas camera={{ position: [5, 0, 0], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <Model position={[0, 0.25, 0]} />
      <Environment preset="city" />
      <ContactShadows frames={1} scale={5} position={[0, -1, 0]} far={1} blur={5} opacity={0.5} color="#204080" />
      <OrbitControls />
    </Canvas>
  )
}
