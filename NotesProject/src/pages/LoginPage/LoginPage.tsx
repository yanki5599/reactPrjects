import React, { useState } from "react";
import "./LoginPage.css";
import useForm from "../../hooks/useForm";
import { login } from "../../store/features/auth/authSlice";
import * as userService from "../../services/userService";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useErrorMsg from "../../hooks/useErrorMsg";
import Loader from "../../components/Loader/Loader";

interface MyFormValues {
  [key: string]: string;
}

const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialValues: MyFormValues = { email: "", password: "" };

  const onSubmit = (values: MyFormValues) => {
    console.log(values);

    resetForm();
    if (
      userService.authenticate(values as { email: string; password: string })
    ) {
      dispatch(login());
      navigate("/notes");
    } else {
      showErrorMsg("email and password not matching");
    }
  };

  const { formValues, handleChange, handleSubmit, resetForm } = useForm(
    initialValues,
    onSubmit
  );

  const { errorMsg, showErrorMsg } = useErrorMsg();

  return (
    <div className="LoginPage Page">
      <h1>Login Page</h1>
      {/* <Loader /> */}
      <form onSubmit={handleSubmit}>
        <label className="errorMsg">{errorMsg}</label>
        <input
          value={formValues.email}
          onChange={handleChange}
          type="text"
          placeholder="Email"
          name="email"
          required
        />
        <input
          value={formValues.password}
          onChange={handleChange}
          type="text"
          placeholder="password"
          name="password"
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
