import "./App.css";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Products" element={<Products />} />
        <Route path="/Cart" element={<Cart />} />
      </Routes>
    </>
  );
}

export default App;
