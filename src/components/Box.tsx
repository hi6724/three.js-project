import React, { useEffect, useRef, useState } from "react";

import { useFrame, useLoader } from "@react-three/fiber";
import texture from "../images/kakao.jpeg";

export default function Box() {
  const myMesh: any = useRef();
  const geoRef: any = useRef();
  const [randomArr, setRandomArr] = useState<Array<number>>([]);
  useEffect(() => {
    try {
      const geoArr = geoRef?.current?.attributes.position.array;
      let temp = [];
      for (let i = 0; i < geoArr.length; i++) {
        geoArr[i] += Math.random() - 0.5;
        temp.push(Math.random() - 0.5);
      }
      setRandomArr(temp);
    } catch (error) {}
  }, [geoRef]);

  useFrame(({ clock }) => {
    const geoArr = geoRef?.current?.attributes.position.array;
    const time = clock.getElapsedTime();

    for (let i = 0; i < geoArr.length; i++) {
      geoArr[i] += Math.sin(time + (Math.random() - 0.5) * 100) * 0.005;
    }
    geoRef.current.attributes.position.needsUpdate = true;
  });

  return (
    <mesh ref={myMesh}>
      <sphereGeometry ref={geoRef} args={[2, 64, 64]} />
      <meshStandardMaterial color="blue" />
    </mesh>
  );
}
