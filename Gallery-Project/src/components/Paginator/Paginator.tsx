import React from "react";
import "./Paginator.css";

interface PaginatorProps {
  currPage: number;
  prevPageFunc: () => void;
  nextPageFunc: () => void;
}

const Paginator: React.FC<PaginatorProps> = ({
  prevPageFunc,
  nextPageFunc,
  currPage,
}) => {
  return (
    <div>
      <button onClick={prevPageFunc}>⏪</button>
      <label>{currPage}</label>
      <button onClick={nextPageFunc}>⏩</button>
    </div>
  );
};

export default Paginator;
