import React, { useEffect, useState } from "react";
import "./PrivatePage.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import Loader from "../../components/Loader/Loader";
import * as userService from "../../services/userService";
import { fetchValidateToken } from "../../store/features/auth/authSlice";

interface PrivatePageProps {
  children: React.ReactNode;
}

const PrivatePage: React.FC<PrivatePageProps> = ({ children }) => {
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const appDispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    appDispatch(fetchValidateToken())
      .unwrap()
      .then(() => {})
      .catch(() => navigate("/login"))
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
