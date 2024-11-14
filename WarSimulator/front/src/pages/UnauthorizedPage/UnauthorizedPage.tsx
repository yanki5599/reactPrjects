import React, { useEffect, useState } from "react";
import "./UnauthorizedPage.css";
import { useNavigate } from "react-router-dom";

interface UnauthorizedPageProps {}

const UnauthorizedPage: React.FC<UnauthorizedPageProps> = ({}) => {
  const [sec, setSec] = useState(3);

  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setSec((prev) => prev - 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (sec === 0) navigate("/");
  }, [sec]);

  return (
    <div className="UnauthorizedPage Page">
      <h1>Unauthorized 401</h1>
      <br />
      <h2>
        returning to Login Page in <span style={{ color: "red" }}>{sec}</span>s
      </h2>
      <br />
      <a href="/login">Go To Login</a>
    </div>
  );
};

export default UnauthorizedPage;
