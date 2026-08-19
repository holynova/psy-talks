import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Home from "../app/page";
import ReadingEdition from "../app/v2/page";
import "../app/globals.css";

const root = document.getElementById("root");

if (!root) {
  throw new Error("Static app root is missing.");
}

const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");
const pathname = window.location.pathname;
const routePath = basePath && pathname.startsWith(basePath)
  ? pathname.slice(basePath.length)
  : pathname;
const Page = routePath.replace(/^\/+|\/+$/g, "") === "v2"
  ? ReadingEdition
  : Home;

createRoot(root).render(
  <StrictMode>
    <Page />
  </StrictMode>,
);
