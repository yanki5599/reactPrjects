import React, { useEffect, useState } from "react";
import "./PrivatePage.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Loader from "../../components/Loader/Loader";
import * as userService from "../../services/userService";

interface PrivatePageProps {
  children: React.ReactNode;
}

const PrivatePage: React.FC<PrivatePageProps> = ({ children }) => {
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    userService
      .isLoggedIn()
      .then(() => {})
      .catch(() => navigate("/unauthorized"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="PrivatePage">
      {loading && <Loader />}
      {!loading && children}
    </div>
  );
};

export default PrivatePage;
