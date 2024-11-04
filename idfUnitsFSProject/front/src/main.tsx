import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { DeploymentProvider } from "./context/DeploymentContext/DeploymentContext.tsx";

createRoot(document.getElementById("root")!).render(
  <DeploymentProvider>
    <App />
  </DeploymentProvider>
);
