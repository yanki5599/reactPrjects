import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App.tsx";
import { ShoppingCartProvider } from "./context/ShoppingCartContext/ShoppingCartContext.tsx";

createRoot(document.getElementById("root")!).render(
  <ShoppingCartProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ShoppingCartProvider>
);
