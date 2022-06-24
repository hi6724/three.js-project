import { Canvas } from "@react-three/fiber";
import React from "react";
import styled from "styled-components";
import Houses from "../components/Houses";

export default function HousePage() {
  return (
    <>
      <Canvas style={{ position: "fixed", top: 0, backgroundColor: "#0F193B" }}>
        <Houses />
      </Canvas>
      <Sections>
        <h1>1</h1>
        <h1>2</h1>
        <h1>3</h1>
        <h1>4</h1>
        <h1>5</h1>
      </Sections>
    </>
  );
}
const Sections = styled.div`
  position: relative;
  h1 {
    box-sizing: border-box;
    padding: 10vmin;
    margin: 0;
    height: 100vh;
  }
`;
