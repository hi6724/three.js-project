import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import HousePage from "./pages/HousPage";
import ImagePanelPage from "./pages/ImagePanelPage";
import StarPage from "./pages/StarPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/star" element={<StarPage />} />
        <Route path="/house" element={<HousePage />} />
        <Route path="/image-panel" element={<ImagePanelPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
