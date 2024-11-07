import { ReactNode, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { RootState } from "../store/store";

interface IPrivateRoute {
  component: ReactNode;
}

const PrivateRoute = ({ component }: IPrivateRoute) => {
  const {} = useSelector((state: RootState) => state.role);

  useEffect(() => {});
};

export default PrivateRoute;
