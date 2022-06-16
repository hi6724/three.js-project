import styled from "styled-components";

function App() {
  return (
    <>
      <Wrapper>
        <h1>Hello World</h1>
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
