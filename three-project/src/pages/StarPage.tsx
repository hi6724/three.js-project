import { Canvas } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import star from "../images/star.png";

export default function StarPage() {
  return (
    <Canvas style={{ height: "100vh", backgroundColor: "#0F193B" }}>
      <Star />
    </Canvas>
  );
}

const Star = () => {
  const ref: any = useRef(null);
  const texture = useTexture(star);

  useEffect(() => {
    const count = 1000;
    const positions = new Float32Array(count * 32);
    const colors = new Float32Array(count * 32);

    for (let i = 0; i < positions.length; i++) {
      positions[i] = (Math.random() - 0.5) * 10;
      colors[i] = Math.random();
    }
    ref.current.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    ref.current.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  }, []);
  return (
    <>
      <OrbitControls />
      <points>
        <bufferGeometry ref={ref} />
        <pointsMaterial
          size={0.1}
          vertexColors
          color={"yellow"}
          map={texture}
          transparent
          alphaMap={texture}
          depthWrite={false}
        />
      </points>
    </>
  );
};
