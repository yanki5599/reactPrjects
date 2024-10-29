import React from "react";
import "./ErrorMsg.css";

const ErrorMsg: React.FC<{ msg: string }> = ({ msg }) => {
  return <h1 className="ErrorMsg">{msg}</h1>;
};

export default ErrorMsg;
