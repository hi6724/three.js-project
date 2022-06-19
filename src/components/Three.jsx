import { Environment, OrbitControls, PerspectiveCamera, PointMaterial } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useRef } from "react";
import { angleToRadians } from "../utils/angle";
import * as THREE from "three";

export default function Three() {
  const ref = useRef();

  useFrame((e) => {
    const { x, y } = e.mouse;
    ref.current.setAzimuthalAngle(-x * angleToRadians(45));
    ref.current.setPolarAngle((y + 1) * angleToRadians(45));
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 1, 5]} />
      <OrbitControls ref={ref} minPolarAngle={angleToRadians(60)} maxPolarAngle={angleToRadians(80)} />

      <mesh position={[0, 1, 0]} castShadow>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#ffffff" metalness={0.6} roughness={0.1} />
      </mesh>
      <mesh rotation={[-angleToRadians(90), 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#1ea3d8" />
      </mesh>
      <points position={[0, 1, 0]}>
        <sphereGeometry args={[1, 32, 32]} />
        <PointMaterial size={0.02} />
      </points>

      <ambientLight args={["#ffffff", 0.25]} />
      <spotLight args={["#ffffff", 1.5, 7, angleToRadians(45), 0.4]} position={[-3, 1, 0]} castShadow />

      <Environment background>
        <mesh>
          <sphereGeometry args={[50, 100, 100]} />
          <meshBasicMaterial side={THREE.BackSide} color="#2280cc" />
        </mesh>
      </Environment>
    </>
  );
}
