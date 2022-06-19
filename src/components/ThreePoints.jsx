import { Environment, OrbitControls, PointMaterial, useTexture } from "@react-three/drei";
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import star from "../images/star.png";
import LookPlane from "./LookPlane";

export default function ThreePoints() {
  const ref = useRef(null);
  const tempRef = useRef(null);
  const texture = useTexture(star);
  const [positions, setPositions] = useState([]);
  const [planePositions, setPlanePositions] = useState([]);
  const [randomPosition, setRandomPosition] = useState([]);

  const [isRandom, setIsRandom] = useState(false);

  //   useEffect(() => {
  //     const count = 1000;
  //     const positions = new Float32Array(count * 32);
  //     const colors = new Float32Array(count * 32);

  //     for (let i = 0; i < positions.length; i++) {
  //       positions[i] = (Math.random() - 0.5) * 10;
  //       colors[i] = Math.random();
  //     }
  //     ref.current.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  //     ref.current.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  //   }, []);

  const togglePosition = () => {
    let newP = [];
    if (isRandom) {
      setPositions(planePositions);
    } else {
      for (let i = 0; i < positions.length; i++) {
        const temp = [(Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10];
        newP.push(temp);
      }
      setPositions(newP);
    }
    setIsRandom(!isRandom);
  };

  useEffect(() => {
    var tempP = Array.from(ref.current.attributes.position.array);
    var newP = [];
    for (let i = 0; i < tempP.length; i += 3) {
      const temp = [tempP[i], tempP[i + 1], tempP[i + 2]];
      newP.push(temp);
    }
    setPositions(newP);
    setPlanePositions(newP);

    newP = [];
    for (let i = 0; i < positions.length; i++) {
      const temp = [(Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10];
      newP.push(temp);
    }
    setRandomPosition(newP);
  }, [ref.current]);

  return (
    <>
      <OrbitControls />
      {/* <points>
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
      </points> */}

      <points>
        <sphereGeometry ref={ref} args={[1, 8, 8]} />
        <meshBasicMaterial transparent />
      </points>
      <Environment background>
        <mesh onClick={togglePosition}>
          <sphereGeometry args={[50, 100, 100]} />
          <meshBasicMaterial side={THREE.DoubleSide} color="#2280cc" />
        </mesh>
      </Environment>
      {planePositions.map((arr, i) => (
        <LookPlane key={i} arr={arr} randomPosition={randomPosition[i]} isRandom={isRandom} />
      ))}
    </>
  );
}
