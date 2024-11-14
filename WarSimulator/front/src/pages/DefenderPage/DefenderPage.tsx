import React, { useEffect } from "react";
import "./DefenderPage.css";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useNavigate } from "react-router-dom";
import WeaponsLayout from "../../components/WeaponsLayout/WeaponsLayout";
import NavBar from "../../components/NavBar/NavBar";

interface DefenderPageProps {}

const DefenderPage: React.FC<DefenderPageProps> = ({}) => {
  const { user } = useSelector((state: RootState) => state.auth);

  const nav = useNavigate();
  useEffect(() => {
    if (!user?.organizationId.name.startsWith("IDF")) nav("/attacker");
  }, []);

  return (
    <>
      <NavBar />
      <div className="DefenderPage Page">
        <h1>Defender page</h1>
        <WeaponsLayout arsenal={user?.arsenal!} />
      </div>
    </>
  );
};

export default DefenderPage;
