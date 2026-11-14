import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Home from "../app/page";
import ReadingEdition from "../app/v2/page";
import "../app/globals.css";

const root = document.getElementById("root");

if (!root) {
  throw new Error("Static app root is missing.");
}

// Both entries share this bundle: `/` serves the practice map,
// `/v2` serves the reading edition. Route by pathname so the two
// editions stay distinct (previously both rendered the reading edition).
const isReadingEdition = window.location.pathname
  .replace(/\/$/, "")
  .endsWith("/v2");

createRoot(root).render(
  <StrictMode>{isReadingEdition ? <ReadingEdition /> : <Home />}</StrictMode>,
);
