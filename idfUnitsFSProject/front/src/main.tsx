import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { DeploymentProvider } from "./context/DeploymentContext/DeploymentContext.tsx";
import { ApiDeploymentProvider } from "./context/DeploymentContext/ApiDeploymentContext.tsx";

createRoot(document.getElementById("root")!).render(
  <ApiDeploymentProvider>
    <DeploymentProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </DeploymentProvider>
  </ApiDeploymentProvider>
);
