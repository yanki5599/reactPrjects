import React, { FC } from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import VotingPage from "./pages/VotingPage/VotingPage";
import StatisticsPage from "./pages/StatisticsPage/StatisticsPage";
import PrivatePage from "./pages/PrivatePage/PrivatePage";
import NotFoundPage from "./components/NotFoundPage/NotFoundPage";
import UnauthorizedPage from "./pages/UnauthorizedPage/UnauthorizedPage";
import AdminPage from "./pages/AdminPage/AdminPage";
import "./App.css";
const App: FC = () => {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <PrivatePage>
              <VotingPage />
            </PrivatePage>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/votingPage"
          element={
            <PrivatePage>
              <VotingPage />
            </PrivatePage>
          }
        />
        <Route
          path="/statisticsPage"
          element={
            <PrivatePage>
              <AdminPage>
                <StatisticsPage />
              </AdminPage>
            </PrivatePage>
          }
        />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default App;
