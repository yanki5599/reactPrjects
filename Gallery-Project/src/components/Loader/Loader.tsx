import React from "react";
import "./Loader.css";

interface LoaderProps {}

const Loader: React.FC<LoaderProps> = ({}) => {
  return (
    <div className="Loader">
      <div className="LoaderInner"></div>
    </div>
  );
};

export default Loader;
