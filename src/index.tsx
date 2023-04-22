import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import HexagonalGrid from "./components/HexagonalGrid";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
    <React.StrictMode>
        <HexagonalGrid />
    </React.StrictMode>
);