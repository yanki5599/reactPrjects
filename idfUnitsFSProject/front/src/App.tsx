import { FC } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import UnitsPage from "./pages/UnitsPage";
import NavBar from "./components/NavBar/NavBar";
import Home from "./pages/Home";

const App: FC = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Units" element={<UnitsPage />} />
      </Routes>
    </>
  );
};

export default App;
