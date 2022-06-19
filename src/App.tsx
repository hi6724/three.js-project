import { Canvas, useFrame } from "@react-three/fiber";
import styled from "styled-components";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import ThreeComponent from "./ThreeComponent";
import { useRef } from "react";
import Three from "./components/Three";
import ThreePoints from "./components/ThreePoints";
import NewThree from "./components/NewThree";

function App() {
  const cameraRef = useRef();

  return (
    <>
      <Wrapper>
        <div>
          <button>Random</button>
          <button>Sphere</button>
        </div>

        <Canvas className="canvas" shadows>
          {/* <Three /> */}

          {/* <ThreePoints /> */}
          <NewThree />
          {/* <ThreeComponent /> */}
          {/* <PerspectiveCamera ref={cameraRef} position={[2, 2, 2]} />
          <OrbitControls camera={cameraRef.current} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[-2, 5, 2]} intensity={1} />
          <Box /> */}
        </Canvas>
      </Wrapper>
    </>
  );
}

export default App;

const Wrapper = styled.div`
  position: relative;
  background-color: #1f1144;
  div {
    position: absolute;
    top: 0;
    left: 0;
  }
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
