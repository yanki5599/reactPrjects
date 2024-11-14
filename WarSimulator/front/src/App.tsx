import React, { FC } from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import PrivatePage from "./pages/PrivatePage/PrivatePage";
import NotFoundPage from "./components/NotFoundPage/NotFoundPage";
import UnauthorizedPage from "./pages/UnauthorizedPage/UnauthorizedPage";
import "./App.css";
import DirectionPage from "./pages/DirectionPage/DirectionPage";
import DefenderPage from "./pages/DefenderPage/DefenderPage";
import AttackerPage from "./pages/AttackerPage/AttackerPage";

const App: FC = () => {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <PrivatePage>
              <DirectionPage />
            </PrivatePage>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/defender"
          element={
            <PrivatePage>
              <DefenderPage />
            </PrivatePage>
          }
        />
        <Route
          path="/attacker"
          element={
            <PrivatePage>
              <AttackerPage />
            </PrivatePage>
          }
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default App;
