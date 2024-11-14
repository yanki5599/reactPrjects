import React, { useEffect, useState } from "react";
import "./DirectionPage.css";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useNavigate } from "react-router-dom";

interface DirectionPageProps {}

const DirectionPage: React.FC<DirectionPageProps> = ({}) => {
  const { user } = useSelector((state: RootState) => state.auth);

  const nav = useNavigate();
  useEffect(() => {
    if (user?.organizationId.name.startsWith("IDF")) nav("/defender");
    else nav("/attacker");
  }, []);
  return (
    <>
      <h1>Redirecting...</h1>
    </>
  );
};

export default DirectionPage;
