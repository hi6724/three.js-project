import { Environment, OrbitControls, PointMaterial, useTexture } from "@react-three/drei";
import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import star from "../images/star.png";
import LookPlane from "./LookPlane";

export default function NewThree() {
  const ref = useRef(null);
  const planeRefs = useRef([]);
  const texture = useTexture(star);
  const [planePositions, setPlanePositions] = useState([]);
  const [randomPosition, setRandomPosition] = useState([]);

  var isRandom = false;
  var rotations = [];

  useEffect(() => {
    var tempP = Array.from(ref.current.attributes.position.array);
    var newP = [];
    for (let i = 0; i < tempP.length; i += 3) {
      const temp = [tempP[i], tempP[i + 1], tempP[i + 2]];
      newP.push(temp);
    }
    setPlanePositions(newP);

    newP = [];
    for (let i = 0; i < planePositions.length; i++) {
      const temp = [(Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10];
      newP.push(temp);
    }
    setRandomPosition(newP);
  }, [ref.current]);

  useEffect(() => {
    const planes = planeRefs.current;
    let temp = [];
    planes.forEach((plane) => {
      plane.lookAt(0, 0, 0);
      const { x, y, z } = plane.rotation;
      temp.push([x, y, z]);
    });
    // temp = [];
    // planes.forEach((plane) => temp.push(plane.rotation));
    rotations = temp;
  }, [planeRefs.current, planePositions]);

  const toggleRandom = () => {
    const planes = planeRefs.current;
    planes.forEach((plane, i) => {
      gsap.to(plane.position, {
        duration: 1,
        x: !isRandom ? randomPosition[i][0] : planePositions[i][0],
        y: !isRandom ? randomPosition[i][1] : planePositions[i][1],
        z: !isRandom ? randomPosition[i][2] : planePositions[i][2],
      });
      gsap.to(plane.rotation, {
        duration: 1,
        x: !isRandom ? 0 : rotations[i][0],
        y: !isRandom ? 0 : rotations[i][1],
        z: !isRandom ? 0 : rotations[i][2],
      });
    });
    isRandom = !isRandom;
  };

  return (
    <>
      <OrbitControls />

      <points>
        <sphereGeometry ref={ref} args={[1, 8, 8]} />
        <meshBasicMaterial transparent />
      </points>
      <Environment background>
        <mesh onClick={toggleRandom}>
          <sphereGeometry args={[50, 100, 100]} />
          <meshBasicMaterial side={THREE.DoubleSide} color="#2280cc" />
        </mesh>
      </Environment>

      {planePositions.map((arr, i) => (
        <mesh ref={(item) => (planeRefs.current[i] = item)} key={i} position={[arr[0], arr[1], arr[2]]}>
          <planeGeometry args={[0.3, 0.3]} />
          <meshBasicMaterial map={texture} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </>
  );
}
