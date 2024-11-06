import React from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/features/auth/authSlice";

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = ({}) => {
  const dispatch = useDispatch();

  return (
    <div className="NavBar">
      <Link to={"/notes"}>
        <button className="link">Notes</button>
      </Link>
      <Link to={"/notes/create"}>
        <button className="link">Add Note</button>
      </Link>
      <Link to={"/login"}>
        <button className="link">Login</button>
      </Link>
      <Link to={"/login"}>
        <button
          onClick={() => {
            dispatch(logout());
          }}
          className="link"
        >
          Logout
        </button>
      </Link>
    </div>
  );
};

export default NavBar;
