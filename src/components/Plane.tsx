import { useFrame } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";

export default function Plane() {
  const ref: any = useRef(null);

  useEffect(() => {
    console.log(ref.current);
    ref.current.rotation.x -= 9;
    // console.log("EFFECT!");
    // if (ref.current.rotation) {
    //   ref.current.rotation.x = 3;
    // }
  }, []);
  useFrame(() => {});
  return (
    <mesh ref={ref}>
      <planeGeometry args={[10, 10]} />
      <meshStandardMaterial color="gray" />
    </mesh>
  );
}
