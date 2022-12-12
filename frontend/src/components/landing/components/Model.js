import React, { useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

export function Model(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/earth.gltf");
  const { actions } = useAnimations(animations, group);
  return (
    <group rotation={props.rotation} ref={group} {...props} dispose={null}>
      <group name="Scene">
        <mesh
          name="Agua001"
          castShadow
          receiveShadow
          geometry={nodes.Agua001.geometry}
          material={materials["Material.005"]}
          scale={1.03}
        />
        <group
          name="Barco001"
          position={[0.72, 0.56, 0.46]}
          rotation={[0.36, -0.15, -0.82]}
          scale={[0.23, 0.07, 0.05]}
        >
          <mesh
            name="Plane102_1"
            castShadow
            receiveShadow
            geometry={nodes.Plane102_1.geometry}
            material={materials["barco.001"]}
          />
          <mesh
            name="Plane102_2"
            castShadow
            receiveShadow
            geometry={nodes.Plane102_2.geometry}
            material={materials["madera.001"]}
          />
          <mesh
            name="Plane102_3"
            castShadow
            receiveShadow
            geometry={nodes.Plane102_3.geometry}
            material={materials["pintura.002"]}
          />
        </group>
        <group name="Tierra">
          <mesh
            name="Icosphere"
            castShadow
            receiveShadow
            geometry={nodes.Icosphere.geometry}
            material={materials["Material.002"]}
          />
          <mesh
            name="Icosphere_1"
            castShadow
            receiveShadow
            geometry={nodes.Icosphere_1.geometry}
            material={materials.playa}
          />
          <mesh
            name="Icosphere_2"
            castShadow
            receiveShadow
            geometry={nodes.Icosphere_2.geometry}
            material={materials.polos}
          />
        </group>
        <group
          name="Avión"
          position={[-0.21, -0.61, -0.79]}
          rotation={[1.14, 0.78, 2.9]}
          scale={[0.2, 0.03, 0.03]}
        >
          <mesh
            name="Plane096_1"
            castShadow
            receiveShadow
            geometry={nodes.Plane096_1.geometry}
            material={materials.barco}
          />
          <mesh
            name="Plane096_2"
            castShadow
            receiveShadow
            geometry={nodes.Plane096_2.geometry}
            material={materials.cristal}
          />
          <mesh
            name="Plane096_3"
            castShadow
            receiveShadow
            geometry={nodes.Plane096_3.geometry}
            material={materials.pintura}
          />
        </group>
        <group
          name="Plane056"
          position={[0.06, 0.64, 0.81]}
          rotation={[0.88, -0.03, -0.07]}
          scale={0.47}
        >
          <mesh
            name="Plane056_1"
            castShadow
            receiveShadow
            geometry={nodes.Plane056_1.geometry}
            material={materials.Casa}
          />
          <mesh
            name="Plane056_2"
            castShadow
            receiveShadow
            geometry={nodes.Plane056_2.geometry}
            material={materials.Tejado}
          />
        </group>
        <group
          name="Plane051"
          position={[-0.95, 0.34, 0.36]}
          rotation={[1.67, -0.4, 1.3]}
          scale={0.35}
        >
          <mesh
            name="Plane097_1"
            castShadow
            receiveShadow
            geometry={nodes.Plane097_1.geometry}
            material={materials.Casa}
          />
          <mesh
            name="Plane097_2"
            castShadow
            receiveShadow
            geometry={nodes.Plane097_2.geometry}
            material={materials.Tejado}
          />
        </group>
        <group
          name="Plane052"
          position={[-0.97, 0.17, 0.42]}
          rotation={[1.72, -0.23, 1.29]}
          scale={0.4}
        >
          <mesh
            name="Plane098_1"
            castShadow
            receiveShadow
            geometry={nodes.Plane098_1.geometry}
            material={materials.Casa}
          />
          <mesh
            name="Plane098_2"
            castShadow
            receiveShadow
            geometry={nodes.Plane098_2.geometry}
            material={materials.Tejado}
          />
        </group>
        <group
          name="Plane053"
          position={[0, 0.11, -1.01]}
          rotation={[1.75, -0.12, 3.14]}
          scale={0.47}
        >
          <mesh
            name="Plane099_1"
            castShadow
            receiveShadow
            geometry={nodes.Plane099_1.geometry}
            material={materials.Casa}
          />
          <mesh
            name="Plane099_2"
            castShadow
            receiveShadow
            geometry={nodes.Plane099_2.geometry}
            material={materials.Tejado}
          />
        </group>
        <group
          name="Plane054"
          position={[0.31, -0.33, 0.91]}
          rotation={[1.86, -0.31, -0.31]}
          scale={0.47}
        >
          <mesh
            name="Plane100_1"
            castShadow
            receiveShadow
            geometry={nodes.Plane100_1.geometry}
            material={materials.Casa}
          />
          <mesh
            name="Plane100_2"
            castShadow
            receiveShadow
            geometry={nodes.Plane100_2.geometry}
            material={materials.Tejado}
          />
        </group>
        <group
          name="Plane055"
          position={[0.44, -0.93, -0.02]}
          rotation={[-2.8, 0.41, -0.42]}
          scale={0.47}
        >
          <mesh
            name="Plane101_1"
            castShadow
            receiveShadow
            geometry={nodes.Plane101_1.geometry}
            material={materials.Casa}
          />
          <mesh
            name="Plane101_2"
            castShadow
            receiveShadow
            geometry={nodes.Plane101_2.geometry}
            material={materials.Tejado}
          />
        </group>
        <mesh
          name="Icosphere002"
          castShadow
          receiveShadow
          geometry={nodes.Icosphere002.geometry}
          material={nodes.Icosphere002.material}
          position={[-0.05, 0.58, -0.42]}
          rotation={[2.63, 0.55, 2.92]}
          scale={0.15}
        />
        <mesh
          name="Icosphere003"
          castShadow
          receiveShadow
          geometry={nodes.Icosphere003.geometry}
          material={nodes.Icosphere003.material}
          position={[-0.27, 0.59, 0.53]}
          rotation={[0.88, -0.31, 0.24]}
          scale={0.15}
        />
        <mesh
          name="Icosphere004"
          castShadow
          receiveShadow
          geometry={nodes.Icosphere004.geometry}
          material={nodes.Icosphere004.material}
          position={[0.04, -0.67, 0.44]}
          rotation={[2.56, -0.06, -0.01]}
          scale={0.13}
        />
        <mesh
          name="Icosphere006"
          castShadow
          receiveShadow
          geometry={nodes.Icosphere006.geometry}
          material={nodes.Icosphere006.material}
          position={[-0.62, 0.84, 0.76]}
          rotation={[1.24, 0.06, 0]}
          scale={0.05}
        />
        <mesh
          name="Icosphere008"
          castShadow
          receiveShadow
          geometry={nodes.Icosphere008.geometry}
          material={nodes.Icosphere008.material}
          position={[-0.07, -0.91, 0.63]}
          rotation={[-2.99, -0.07, -0.05]}
          scale={0.05}
        />
        <mesh
          name="Plane057"
          castShadow
          receiveShadow
          geometry={nodes.Plane057.geometry}
          material={materials["arbol.001"]}
          position={[0.73, 0.12, 0.76]}
          rotation={[0.91, -0.47, -0.91]}
          scale={0.02}
        />
        <mesh
          name="Plane058"
          castShadow
          receiveShadow
          geometry={nodes.Plane058.geometry}
          material={materials["arbol.001"]}
          position={[0.63, 0.18, 0.89]}
          rotation={[0.95, -0.51, -0.72]}
          scale={0.03}
        />
        <mesh
          name="Plane059"
          castShadow
          receiveShadow
          geometry={nodes.Plane059.geometry}
          material={materials["arbol.001"]}
          position={[0.51, 0.05, 0.93]}
          rotation={[1.12, -0.62, -0.59]}
          scale={0.02}
        />
        <mesh
          name="Plane060"
          castShadow
          receiveShadow
          geometry={nodes.Plane060.geometry}
          material={materials["arbol.001"]}
          position={[0.66, -0.01, 0.85]}
          rotation={[1.04, -0.55, -0.97]}
          scale={0.02}
        />
        <mesh
          name="Plane067"
          castShadow
          receiveShadow
          geometry={nodes.Plane067.geometry}
          material={materials["arbol.001"]}
          position={[0.59, -0.15, 0.87]}
          rotation={[1.16, -0.68, -0.85]}
          scale={0.02}
        />
        <mesh
          name="Plane068"
          castShadow
          receiveShadow
          geometry={nodes.Plane068.geometry}
          material={materials["arbol.001"]}
          position={[0.45, -0.12, 0.96]}
          rotation={[1.25, -0.69, -0.63]}
          scale={0.01}
        />
        <mesh
          name="Plane071"
          castShadow
          receiveShadow
          geometry={nodes.Plane071.geometry}
          material={materials["arbol.001"]}
          position={[-0.06, 0.96, 0.47]}
          rotation={[0.39, -0.73, -0.04]}
          scale={0.02}
        />
        <mesh
          name="Plane086"
          castShadow
          receiveShadow
          geometry={nodes.Plane086.geometry}
          material={materials["arbol.001"]}
          position={[0.03, 0.85, 0.65]}
          rotation={[0.59, -0.73, 0.02]}
          scale={0.02}
        />
        <mesh
          name="Plane087"
          castShadow
          receiveShadow
          geometry={nodes.Plane087.geometry}
          material={materials["arbol.001"]}
          position={[-0.12, 1.01, 0.31]}
          rotation={[0.37, -0.74, 0.12]}
          scale={0.03}
        />
        <mesh
          name="Plane088"
          castShadow
          receiveShadow
          geometry={nodes.Plane088.geometry}
          material={materials["arbol.001"]}
          position={[-0.27, 0.93, 0.45]}
          rotation={[0.75, -0.66, 0.4]}
          scale={0.01}
        />
        <mesh
          name="Plane089"
          castShadow
          receiveShadow
          geometry={nodes.Plane089.geometry}
          material={materials["arbol.001"]}
          position={[-0.13, 0.89, 0.57]}
          rotation={[0.77, -0.65, 0.24]}
          scale={0.01}
        />
        <mesh
          name="Plane090"
          castShadow
          receiveShadow
          geometry={nodes.Plane090.geometry}
          material={materials["arbol.001"]}
          position={[-0.2, 0.79, 0.69]}
          rotation={[0.77, -0.65, 0.24]}
          scale={0.01}
        />
        <mesh
          name="Plane091"
          castShadow
          receiveShadow
          geometry={nodes.Plane091.geometry}
          material={materials["arbol.001"]}
          position={[-0.3, 0.98, 0.3]}
          rotation={[0.56, -0.71, 0.35]}
          scale={0.02}
        />
        <mesh
          name="Plane092"
          castShadow
          receiveShadow
          geometry={nodes.Plane092.geometry}
          material={materials["arbol.001"]}
          position={[-0.4, 0.45, -0.82]}
          rotation={[-0.1, -1.06, 1.03]}
          scale={0.02}
        />
        <mesh
          name="Plane093"
          castShadow
          receiveShadow
          geometry={nodes.Plane093.geometry}
          material={materials["arbol.001"]}
          position={[-0.33, 0.31, -0.91]}
          rotation={[-0.32, -1.2, 0.91]}
          scale={0.02}
        />
        <mesh
          name="Plane094"
          castShadow
          receiveShadow
          geometry={nodes.Plane094.geometry}
          material={materials["arbol.001"]}
          position={[-0.46, 0.29, -0.88]}
          rotation={[-0.01, -0.93, 1.21]}
          scale={0.01}
        />
        <mesh
          name="Plane095"
          castShadow
          receiveShadow
          geometry={nodes.Plane095.geometry}
          material={materials["arbol.001"]}
          position={[-0.54, 0.41, -0.76]}
          rotation={[-0.01, -0.93, 1.21]}
          scale={0.01}
        />
        <mesh
          name="Plane096"
          castShadow
          receiveShadow
          geometry={nodes.Plane096.geometry}
          material={materials["arbol.001"]}
          position={[-0.59, 0.22, -0.8]}
          rotation={[-0.02, -0.94, 1.38]}
          scale={0.02}
        />
        <mesh
          name="Plane097"
          castShadow
          receiveShadow
          geometry={nodes.Plane097.geometry}
          material={materials["arbol.001"]}
          position={[-0.4, 0.13, -0.93]}
          rotation={[-0.07, -1.1, 1.41]}
          scale={0.01}
        />
        <mesh
          name="Plane098"
          castShadow
          receiveShadow
          geometry={nodes.Plane098.geometry}
          material={materials["arbol.001"]}
          position={[0.57, 0.61, -0.58]}
          rotation={[-2.29, -0.98, -1.52]}
          scale={0.02}
        />
        <mesh
          name="Plane099"
          castShadow
          receiveShadow
          geometry={nodes.Plane099.geometry}
          material={materials["arbol.001"]}
          position={[0.55, 0.76, -0.39]}
          rotation={[-2.3, -1.04, -1.84]}
          scale={0.02}
        />
        <mesh
          name="Plane100"
          castShadow
          receiveShadow
          geometry={nodes.Plane100.geometry}
          material={materials["arbol.001"]}
          position={[0.48, 0.86, -0.26]}
          rotation={[-2.26, -0.97, -1.97]}
          scale={0.02}
        />
        <mesh
          name="Plane101"
          castShadow
          receiveShadow
          geometry={nodes.Plane101.geometry}
          material={materials["arbol.001"]}
          position={[0.6, 0.79, -0.27]}
          rotation={[-2.26, -0.97, -1.97]}
          scale={0.01}
        />
        <mesh
          name="Plane102"
          castShadow
          receiveShadow
          geometry={nodes.Plane102.geometry}
          material={materials["arbol.001"]}
          position={[0.69, 0.58, -0.49]}
          rotation={[-2.24, -0.93, -1.65]}
          scale={0.02}
        />
        <mesh
          name="Plane103"
          castShadow
          receiveShadow
          geometry={nodes.Plane103.geometry}
          material={materials["arbol.001"]}
          position={[0.78, 0.55, -0.37]}
          rotation={[-2.22, -0.75, -1.66]}
          scale={0.01}
        />
        <mesh
          name="Plane104"
          castShadow
          receiveShadow
          geometry={nodes.Plane104.geometry}
          material={materials["arbol.001"]}
          position={[0.77, 0.43, -0.51]}
          rotation={[-2.22, -0.69, -1.36]}
          scale={0.01}
        />
        <mesh
          name="Plane105"
          castShadow
          receiveShadow
          geometry={nodes.Plane105.geometry}
          material={materials["arbol.001"]}
          position={[0.86, 0.42, -0.36]}
          rotation={[-2.23, -0.64, -1.53]}
          scale={0.02}
        />
        <mesh
          name="Plane106"
          castShadow
          receiveShadow
          geometry={nodes.Plane106.geometry}
          material={materials["arbol.001"]}
          position={[-0.02, -1.06, -0.14]}
          rotation={[-2.98, 0.15, -0.05]}
          scale={0.02}
        />
        <mesh
          name="Plane107"
          castShadow
          receiveShadow
          geometry={nodes.Plane107.geometry}
          material={materials["arbol.001"]}
          position={[-0.15, -1.05, -0.1]}
          rotation={[-3.07, 0.15, 0.13]}
          scale={0.02}
        />
        <mesh
          name="Plane108"
          castShadow
          receiveShadow
          geometry={nodes.Plane108.geometry}
          material={materials["arbol.001"]}
          position={[-0.22, -1.02, -0.23]}
          rotation={[-3, 0.16, 0.24]}
          scale={0.02}
        />
        <mesh
          name="Plane109"
          castShadow
          receiveShadow
          geometry={nodes.Plane109.geometry}
          material={materials["arbol.001"]}
          position={[-0.02, -1.03, -0.3]}
          rotation={[-2.85, 0.17, -0.09]}
          scale={0.02}
        />
        <mesh
          name="Plane110"
          castShadow
          receiveShadow
          geometry={nodes.Plane110.geometry}
          material={materials["arbol.001"]}
          position={[-0.2, -1.01, -0.38]}
          rotation={[-2.82, 0.17, 0.21]}
          scale={0.02}
        />
        <mesh
          name="Plane111"
          castShadow
          receiveShadow
          geometry={nodes.Plane111.geometry}
          material={materials["arbol.001"]}
          position={[-0.03, -0.98, -0.4]}
          rotation={[-2.74, 0.18, 0.03]}
          scale={0.02}
        />
        <mesh
          name="Plane112"
          castShadow
          receiveShadow
          geometry={nodes.Plane112.geometry}
          material={materials["arbol.001"]}
          position={[0.14, -1.05, -0.18]}
          rotation={[-2.98, 0.18, -0.05]}
          scale={0.01}
        />
        <mesh
          name="Plane113"
          castShadow
          receiveShadow
          geometry={nodes.Plane113.geometry}
          material={materials["arbol.001"]}
          position={[-0.98, -0.28, 0.12]}
          rotation={[2.86, 0.09, 1.28]}
          scale={0.02}
        />
        <mesh
          name="Plane114"
          castShadow
          receiveShadow
          geometry={nodes.Plane114.geometry}
          material={materials["arbol.001"]}
          position={[-0.93, -0.17, 0.37]}
          rotation={[2.77, -0.23, 1.3]}
          scale={0.02}
        />
        <mesh
          name="Plane115"
          castShadow
          receiveShadow
          geometry={nodes.Plane115.geometry}
          material={materials["arbol.001"]}
          position={[-0.99, -0.17, 0.2]}
          rotation={[2.79, -0.12, 1.44]}
          scale={0.02}
        />
        <mesh
          name="Plane116"
          castShadow
          receiveShadow
          geometry={nodes.Plane116.geometry}
          material={materials["arbol.001"]}
          position={[-1.01, -0.16, 0]}
          rotation={[2.82, 0.05, 1.41]}
          scale={0.02}
        />
        <mesh
          name="Plane117"
          castShadow
          receiveShadow
          geometry={nodes.Plane117.geometry}
          material={materials["arbol.001"]}
          position={[-1.01, -0.02, 0.15]}
          rotation={[2.79, -0.12, 1.44]}
          scale={0.01}
        />
        <mesh
          name="Plane118"
          castShadow
          receiveShadow
          geometry={nodes.Plane118.geometry}
          material={materials["arbol.001"]}
          position={[-1, 0.11, 0.17]}
          rotation={[2.79, -0.18, 1.61]}
          scale={0.02}
        />
        <mesh
          name="Plane119"
          castShadow
          receiveShadow
          geometry={nodes.Plane119.geometry}
          material={materials["arbol.001"]}
          position={[-0.91, -0.06, 0.46]}
          rotation={[2.76, -0.41, 1.31]}
          scale={0.02}
        />
        <mesh
          name="Plane120"
          castShadow
          receiveShadow
          geometry={nodes.Plane120.geometry}
          material={materials["arbol.001"]}
          position={[0.13, 0.47, 0.91]}
          rotation={[1.05, -0.65, -0.17]}
          scale={0.02}
        />
        <mesh
          name="Plane121"
          castShadow
          receiveShadow
          geometry={nodes.Plane121.geometry}
          material={materials["arbol.001"]}
          position={[-0.15, 0.51, 0.89]}
          rotation={[1.21, -0.65, 0.16]}
          scale={0.03}
        />
        <mesh
          name="Plane122"
          castShadow
          receiveShadow
          geometry={nodes.Plane122.geometry}
          material={materials["arbol.001"]}
          position={[0.02, 0.39, 0.99]}
          rotation={[1.2, -0.65, -0.02]}
          scale={0.02}
        />
        <mesh
          name="Plane123"
          castShadow
          receiveShadow
          geometry={nodes.Plane123.geometry}
          material={materials["arbol.001"]}
          position={[0.74, -0.13, 0.76]}
          rotation={[1, -0.57, -0.99]}
          scale={0.02}
        />
        <mesh
          name="Plane124"
          castShadow
          receiveShadow
          geometry={nodes.Plane124.geometry}
          material={materials["arbol.001"]}
          position={[0.76, 0.01, 0.74]}
          rotation={[0.91, -0.47, -0.91]}
          scale={0.02}
        />
        <mesh
          name="Plane125"
          castShadow
          receiveShadow
          geometry={nodes.Plane125.geometry}
          material={materials["arbol.001"]}
          position={[0.63, -0.33, 0.8]}
          rotation={[1.22, -0.8, -0.95]}
          scale={0.02}
        />
        <mesh
          name="Plane126"
          castShadow
          receiveShadow
          geometry={nodes.Plane126.geometry}
          material={materials["arbol.001"]}
          position={[-0.84, 0.31, 0.59]}
          rotation={[2.73, -0.69, 1.62]}
          scale={0.02}
        />
        <mesh
          name="Plane127"
          castShadow
          receiveShadow
          geometry={nodes.Plane127.geometry}
          material={materials["arbol.001"]}
          position={[-0.87, 0.18, 0.6]}
          rotation={[2.73, -0.64, 1.49]}
          scale={0.03}
        />
        <mesh
          name="Plane128"
          castShadow
          receiveShadow
          geometry={nodes.Plane128.geometry}
          material={materials["arbol.001"]}
          position={[0.43, -0.9, -0.21]}
          rotation={[-2.91, 0.17, -0.38]}
          scale={0.01}
        />
        <mesh
          name="Plane129"
          castShadow
          receiveShadow
          geometry={nodes.Plane129.geometry}
          material={materials["arbol.001"]}
          position={[0.52, -0.86, -0.17]}
          rotation={[-2.87, 0.15, -0.56]}
          scale={0.01}
        />
        <mesh
          name="Plane130"
          castShadow
          receiveShadow
          geometry={nodes.Plane130.geometry}
          material={materials["arbol.001"]}
          position={[0.58, -0.83, -0.09]}
          rotation={[-2.87, 0.15, -0.56]}
          scale={0.01}
        />
        <mesh
          name="Plane131"
          castShadow
          receiveShadow
          geometry={nodes.Plane131.geometry}
          material={materials["arbol.001"]}
          position={[0.3, -0.97, 0.09]}
          rotation={[-3.07, 0.23, -0.3]}
          scale={0.01}
        />
        <mesh
          name="Plane132"
          castShadow
          receiveShadow
          geometry={nodes.Plane132.geometry}
          material={materials["arbol.001"]}
          position={[0.37, -0.93, 0.16]}
          rotation={[3.08, 0.27, -0.39]}
          scale={0.01}
        />
        <mesh
          name="Plane133"
          castShadow
          receiveShadow
          geometry={nodes.Plane133.geometry}
          material={materials["arbol.001"]}
          position={[0.48, -0.89, 0.15]}
          rotation={[3.12, 0.25, -0.57]}
          scale={0.01}
        />
        <mesh
          name="Plane134"
          castShadow
          receiveShadow
          geometry={nodes.Plane134.geometry}
          material={materials["arbol.001"]}
          position={[0.58, -0.83, 0.09]}
          rotation={[3.12, 0.25, -0.57]}
          scale={0.01}
        />
        <mesh
          name="Plane135"
          castShadow
          receiveShadow
          geometry={nodes.Plane135.geometry}
          material={materials["arbol.001"]}
          position={[0.62, -0.8, -0.01]}
          rotation={[-3.02, 0.15, -0.66]}
          scale={0.01}
        />
        <mesh
          name="Plane136"
          castShadow
          receiveShadow
          geometry={nodes.Plane136.geometry}
          material={materials["arbol.001"]}
          position={[-0.26, -0.4, -0.96]}
          rotation={[-1.86, -0.09, 0.3]}
          scale={0.01}
        />
        <mesh
          name="Plane137"
          castShadow
          receiveShadow
          geometry={nodes.Plane137.geometry}
          material={materials["arbol.001"]}
          position={[-0.33, -0.25, -0.98]}
          rotation={[-1.74, -0.04, 0.31]}
          scale={0.01}
        />
        <mesh
          name="Plane138"
          castShadow
          receiveShadow
          geometry={nodes.Plane138.geometry}
          material={materials["arbol.001"]}
          position={[-0.12, -0.36, -1]}
          rotation={[-1.92, -0.08, 0.02]}
          scale={0.01}
        />
        <mesh
          name="Plane139"
          castShadow
          receiveShadow
          geometry={nodes.Plane139.geometry}
          material={materials["arbol.001"]}
          position={[-0.01, -0.19, -1.08]}
          rotation={[-1.75, -0.07, 0]}
          scale={0.01}
        />
        <mesh
          name="Plane140"
          castShadow
          receiveShadow
          geometry={nodes.Plane140.geometry}
          material={materials["arbol.001"]}
          position={[-0.21, -0.11, -1.04]}
          rotation={[-1.64, -0.07, 0.16]}
          scale={0.02}
        />
        <mesh
          name="Plane141"
          castShadow
          receiveShadow
          geometry={nodes.Plane141.geometry}
          material={materials["arbol.001"]}
          position={[-0.21, -0.24, -1.02]}
          rotation={[-1.72, -0.08, 0.31]}
          scale={0.01}
        />
        <mesh
          name="Plane142"
          castShadow
          receiveShadow
          geometry={nodes.Plane142.geometry}
          material={materials["arbol.001"]}
          position={[0.15, -0.12, -1]}
          rotation={[-1.68, -0.08, -0.16]}
          scale={0.01}
        />
        <mesh
          name="Plane143"
          castShadow
          receiveShadow
          geometry={nodes.Plane143.geometry}
          material={materials["arbol.001"]}
          position={[0.04, -0.36, -1.01]}
          rotation={[-1.92, -0.06, 0.02]}
          scale={0.01}
        />
        <mesh
          name="Plane144"
          castShadow
          receiveShadow
          geometry={nodes.Plane144.geometry}
          material={materials["arbol.001"]}
          position={[-0.06, -0.45, -0.97]}
          rotation={[-1.92, -0.06, 0.02]}
          scale={0.02}
        />
        <mesh
          name="Plane145"
          castShadow
          receiveShadow
          geometry={nodes.Plane145.geometry}
          material={materials["arbol.001"]}
          position={[-0.28, 0.84, 0.6]}
          rotation={[0.78, -0.68, 0.24]}
          scale={0.02}
        />
        <mesh
          name="Plane146"
          castShadow
          receiveShadow
          geometry={nodes.Plane146.geometry}
          material={materials["arbol.001"]}
          position={[0.69, 0.69, -0.31]}
          rotation={[-2.22, -0.75, -1.66]}
          scale={0.01}
        />
        <mesh
          name="Plane147"
          castShadow
          receiveShadow
          geometry={nodes.Plane147.geometry}
          material={materials["arbol.001"]}
          position={[0.77, 0.64, -0.18]}
          rotation={[-2.2, -0.68, -1.81]}
          scale={0.02}
        />
        <mesh
          name="Icosphere015"
          castShadow
          receiveShadow
          geometry={nodes.Icosphere015.geometry}
          material={nodes.Icosphere015.material}
          position={[-1.02, -0.61, 0.03]}
          rotation={[1.71, 0.18, 1.56]}
          scale={0.09}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/earth.gltf");