import React from "react";
import ReactDOM from "react-dom/client";
import { Reset } from "styled-reset";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Reset />
    <App />
  </React.StrictMode>
);
