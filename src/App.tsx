import { Canvas } from "@react-three/fiber";
import styled from "styled-components";
import { OrbitControls } from "@react-three/drei";
import Box from "./components/Box";

function App() {
  return (
    <>
      <Wrapper>
        <h1>Hello World</h1>
        <Canvas className="canvas">
          <OrbitControls />
          <ambientLight intensity={0.5} />
          <directionalLight position={[-2, 5, 2]} intensity={1} />
          <Box />
        </Canvas>
      </Wrapper>
    </>
  );
}

export default App;

const Wrapper = styled.div`
  position: relative;
  background-color: #1f1144;
  .canvas {
    width: 100%;
    height: 100%;
  }
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  h1 {
    position: absolute;
    top: 0;
  }
`;
