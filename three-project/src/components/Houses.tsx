import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import gsap from "gsap";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Houses() {
  const ref: any = useRef();
  const handleScroll = (e: any) => {
    const index = Math.round(window.scrollY / window.innerHeight);
    gsap.to(ref.current.position, {
      duration: 1,
      x: -positions[index].x,
      z: -positions[index].z - 5,
    });
  };
  const positions = [
    { x: 7, z: 30 },
    { x: 7, z: 10 },
    { x: -10, z: 0 },
    { x: 10, z: -10 },
    { x: -5, z: -20 },
  ];
  useEffect(() => {
    positions.map((item) => console.log(item));
    document.addEventListener("scroll", handleScroll);
    return () => document.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <OrbitControls />
      <PerspectiveCamera ref={ref} position={[-7, -3, -35]} rotation={[Math.PI / 50, 0, 0]}>
        {positions.map((info, i) => (
          <mesh key={i} position={[info.x, 1, info.z]}>
            <boxGeometry args={[2, 2, 2]} />
            <meshBasicMaterial color={"blue"} />
          </mesh>
        ))}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <planeGeometry args={[100, 100]} />
          <meshBasicMaterial side={THREE.DoubleSide} color={"gray"} />
        </mesh>
      </PerspectiveCamera>
    </>
  );
}
