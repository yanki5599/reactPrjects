import "./App.css";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Home from "./pages/Home";
import News from "./pages/News";
import Sport from "./pages/Sport";
import Users from "./pages/Users";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/News" element={<News />} />
        <Route path="/Sport" element={<Sport />} />
        <Route path="/Sport" element={<Sport />} />
        <Route path="/users/:id?" element={<Users />} />
      </Routes>
    </>
  );
}

export default App;
