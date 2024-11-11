import React, { ReactNode, useEffect } from "react";
import "./AdminPage.css";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useNavigate } from "react-router-dom";

interface AdminPageProps {
  children: ReactNode;
}

const AdminPage: React.FC<AdminPageProps> = ({ children }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/login");

    if (!user?.isAdmin) navigate("/unauthorized");
  }, []);

  return <>{children}</>;
};

export default AdminPage;
