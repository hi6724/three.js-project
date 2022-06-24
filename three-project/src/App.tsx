import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import StarPage from "./pages/StarPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/star" element={<StarPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
