import React from "react";
import "./ErrorMsgModal.css";

interface ErrorMsgModalProps {
  errorMsg: string;
}

const ErrorMsgModal: React.FC<ErrorMsgModalProps> = ({ errorMsg }) => {
  return (
    <div className="ErrorMsgModal">
      <h1>{errorMsg}</h1>
    </div>
  );
};

export default ErrorMsgModal;
