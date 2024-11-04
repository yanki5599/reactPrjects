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
      <Link to={"/Products"}>
        <button className="link">Products</button>
      </Link>
      <Link to={"/Cart"}>
        <button className="link">Cart</button>
      </Link>
    </div>
  );
};

export default NavBar;
