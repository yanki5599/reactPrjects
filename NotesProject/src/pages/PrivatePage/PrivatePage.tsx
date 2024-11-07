import React, { useEffect, useState } from "react";
import "./PrivatePage.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Loader from "../../components/Loader/Loader";

interface PrivatePageProps {
  children: React.ReactNode;
}

const PrivatePage: React.FC<PrivatePageProps> = ({ children }) => {
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!isLoggedIn) navigate("/unauthorized");
    setLoading(false);
  });

  return <div className="PrivatePage">{loading || children}</div>;
};

export default PrivatePage;
