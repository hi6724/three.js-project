import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import HousePage from "./pages/HousPage";
import StarPage from "./pages/StarPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/star" element={<StarPage />} />
        <Route path="/house" element={<HousePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
