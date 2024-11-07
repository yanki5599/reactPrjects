import React, { useEffect } from "react";
import "./ProtectedRoute.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { floors } = useSelector((state: RootState) => state.floors);

  useEffect(() => {
    const index = parseInt(id || "");
    if (!index || index < 0 || index >= floors.length || !floors[index]) {
      navigate("/forbidden");
    }
  });

  return <div className="ProtectedRoute">{children}</div>;
};

export default ProtectedRoute;
