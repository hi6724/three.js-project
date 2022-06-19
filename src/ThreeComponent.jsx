import { PerspectiveCamera, PointerLockControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import Box from "./components/Box";

export default function ThreeComponent() {
  const ref = useRef();
  const [direction, setDirection] = useState([0, 0]);

  const handleKeydown = ({ key }) => {
    switch (key) {
      case "w":
        setDirection([1, 0]);
        break;
      case "a":
        setDirection([0, -1]);
        break;
      case "s":
        setDirection([-1, 0]);
        break;
      case "d":
        setDirection([0, 1]);
        break;
      case "q":
        ref.current.lock();
        break;
      case "e":
        ref.current.unlock();
        break;
      default:
        break;
    }
  };

  const handleKeyUp = () => {
    setDirection([0, 0]);
  };

  const handleLock = () => {
    if (ref.current.isLocked) {
      ref.current.unlock();
    } else {
      ref.current.lock();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeydown);
    document.addEventListener("keyup", handleKeyUp);
    document.addEventListener("click", handleLock);
    return () => {
      document.removeEventListener("keydown", handleKeydown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useFrame((e) => {
    ref.current.moveForward(direction[0] * 0.1);
    ref.current.moveRight(direction[1] * 0.1);
  });

  return (
    <>
      <PerspectiveCamera>
        <PointerLockControls ref={ref} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[-2, 5, 2]} intensity={1} />
        <Box />
      </PerspectiveCamera>
    </>
  );
}
