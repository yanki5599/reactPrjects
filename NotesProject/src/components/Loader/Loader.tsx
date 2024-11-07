import React from "react";
import "./Loader.css";

interface LoaderProps {}

const Loader: React.FC<LoaderProps> = ({}) => {
  return (
    <div className="Loader">
      <div className="innerLoader"></div>
    </div>
  );
};

export default Loader;
