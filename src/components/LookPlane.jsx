import { useTexture } from "@react-three/drei";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import star from "../images/star.png";
import img1 from "../images/01.jpg";
import img2 from "../images/02.jpg";
import img3 from "../images/03.jpg";
import img4 from "../images/04.jpg";
import img5 from "../images/05.jpg";
import gsap from "gsap";

export default function LookPlane({ arr, randomPosition, isRandom }) {
  const ref = useRef();
  const images = [img1, img2, img3, img4, img5];
  const randomIndex = Math.floor(Math.random() * 5);
  const texture = useTexture(images[randomIndex]);
  useEffect(() => {
    if (ref.current && arr && randomPosition) {
      ref.current?.lookAt(0, 0, 0);
      gsap.to(ref.current?.position, {
        duration: 1,
        x: !isRandom ? arr[0] : randomPosition[0],
        y: !isRandom ? arr[1] : randomPosition[1],
        z: !isRandom ? arr[2] : randomPosition[2],
        // onComplete: () => ref.current?.lookAt(0, 0, 0),
      });
    }
  }, [ref.current, isRandom]);

  return (
    <mesh ref={ref} position={[arr[0], arr[1], arr[2]]}>
      <planeGeometry args={[0.3, 0.3]} />
      <meshBasicMaterial map={texture} side={THREE.DoubleSide} />
    </mesh>
  );
}
