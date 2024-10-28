import React, { useState } from "react";

interface ModalMsgProps {
  modalMsg: string;
  showModal: boolean;
}

const ModalMsg: React.FC<{}> = ({ modalMsg, showModal }) => {
  return (
    <h3 className="modal" style={{ display: showModal ? "block" : "none" }}>
      {modalMsg}
    </h3>
  );
};

export default ModalMsg;
