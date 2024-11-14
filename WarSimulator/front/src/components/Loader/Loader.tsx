import React from "react";
import "./Loader.css";

interface LoaderProps {
  center?: boolean;
}

const Loader: React.FC<LoaderProps> = ({ center = false }) => {
  return <span className={`loader ${center ? "stickCenter" : ""}`}></span>;
};

export default Loader;
