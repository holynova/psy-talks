import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ReadingEdition from "../app/v2/page";
import "../app/globals.css";

const root = document.getElementById("root");

if (!root) {
  throw new Error("Static app root is missing.");
}

createRoot(root).render(
  <StrictMode>
    <ReadingEdition />
  </StrictMode>,
);
