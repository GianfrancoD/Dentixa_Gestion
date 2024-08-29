import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { router, RouterProvider } from "./router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
