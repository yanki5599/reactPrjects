import React from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";
import { logout } from "../../store/features/auth/authSlice";
import { useDispatch } from "react-redux";

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = ({}) => {
  const dispatch = useDispatch();
  return (
    <div className="NavBar">
      <Link to={"/statisticsPage"}>
        <button className="link">statistics</button>
      </Link>
      <Link to={"/votingPage"}>
        <button className="link">voting Page</button>
      </Link>
      <Link to={"/login"}>
        <button onClick={() => dispatch(logout())} className="link">
          Logout
        </button>
      </Link>
    </div>
  );
};

export default NavBar;
