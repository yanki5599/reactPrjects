import React, { ReactElement } from "react";
import "./Modal.css";

interface ModalProps {
  message: string;
  element?: ReactElement;
}

const Modal: React.FC<ModalProps> = ({ message, element }) => {
  return (
    <div className="Modal">
      <div className="Message">{message}</div>
      {element}
    </div>
  );
};

export default Modal;
