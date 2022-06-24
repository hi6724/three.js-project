import { Canvas } from "@react-three/fiber";
import React from "react";
import ImagePanels from "../components/ImagePanels";

export default function ImagePanelPage() {
  return (
    <Canvas style={{ height: "100vh" }}>
      <ImagePanels />
    </Canvas>
  );
}
