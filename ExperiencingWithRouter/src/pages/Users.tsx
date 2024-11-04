import React from "react";
import { useParams } from "react-router-dom";

const Users = () => {
  const { id } = useParams();
  return <main className="Page">Users id: {id ?? ""}</main>;
};

export default Users;
