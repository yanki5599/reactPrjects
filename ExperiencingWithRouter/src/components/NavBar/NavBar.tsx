import React from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = ({}) => {
  return (
    <div className="NavBar">
      <Link to={"/"}>
        <button className="link">Home</button>
      </Link>
      <Link to={"/news"}>
        <button className="link">News</button>
      </Link>
      <Link to={"/sport"}>
        <button className="link">Sport</button>
      </Link>
      <Link to={"/users/4"}>
        <button className="link">User 4</button>
      </Link>
    </div>
  );
};

export default NavBar;
