import React from "react";
import "./ErrorMsg.css";

interface ErrorMsgProps {
  msg: string;
  destroyFunc: () => void;
}

const ErrorMsg: React.FC<ErrorMsgProps> = ({ msg, destroyFunc }) => {
  setTimeout(() => {
    destroyFunc();
  }, 3000);
  return <h1 className="ErrorMsg">{msg}</h1>;
};

export default ErrorMsg;
