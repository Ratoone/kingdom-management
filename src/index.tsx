import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import HexagonalGrid from "./components/map/HexagonalGrid";
import { Role } from "./components/Role";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
    <React.StrictMode>
        <HexagonalGrid role={Role.GM} />
    </React.StrictMode>
);