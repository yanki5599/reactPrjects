import React from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { fetchLogout } from "../../store/features/auth/authSlice";

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = ({}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  return (
    <div className="NavBar">
      <h3 style={{ color: "white" }}>Hello {user?.username}</h3>

      <Link to={"/login"}>
        <button onClick={() => dispatch(fetchLogout())} className="link">
          Logout
        </button>
      </Link>
    </div>
  );
};

export default NavBar;
