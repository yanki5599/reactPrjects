import React from "react";
import "./GenericButton.css";

export enum ButtonStyle {
  PRIMARY = "Primary-btn",
  SUCCESS = "Success-btn",
  WARNING = "Warning-btn",
  DANGER = "Danger-btn",
}

interface GenericButtonProps {
  text: string;
  ButtonType: ButtonStyle;
  style?: string;
  onClick?: (e: any) => void;
}

const GenericButton: React.FC<GenericButtonProps> = ({
  text,
  ButtonType,
  style = "",
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`GenericButton ${ButtonType} ${style}`}
    >
      {text}
    </button>
  );
};

export default GenericButton;
