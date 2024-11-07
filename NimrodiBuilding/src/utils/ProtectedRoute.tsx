import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { index } = useParams();
  const navigate = useNavigate();
  const { floorAccess } = useSelector((state: RootState) => state.floorAccess);

  useEffect(() => {
    const parsedIndex = parseInt(index || "");
    if (
      parsedIndex === undefined ||
      parsedIndex < 0 ||
      parsedIndex >= floorAccess.length ||
      !floorAccess[parsedIndex]
    ) {
      navigate("/forbidden");
    }
  }, [index]);

  return <div className="ProtectedRoute">{children}</div>;
};

export default ProtectedRoute;
