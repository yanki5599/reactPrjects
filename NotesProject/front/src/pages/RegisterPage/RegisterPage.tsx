import React, { useState } from "react";
import "./RegisterPage.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as userService from "../../services/userService";
import Loader from "../../components/Loader/Loader";
import useErrorMsg from "../../hooks/useErrorMsg";
import useForm from "../../hooks/useForm";

interface MyFormValues {
  [key: string]: string;
}

const RegisterPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues: MyFormValues = { username: "", password: "" };

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async (values: MyFormValues) => {
    resetForm();
    setIsLoading(true);
    userService
      .register(values as { username: string; password: string })
      .then(() => {
        navigate("/login");
      })
      .catch((err) => showErrorMsg(err.message))
      .finally(() => setIsLoading(false));
  };

  const { formValues, handleChange, handleSubmit, resetForm } = useForm(
    initialValues,
    onSubmit
  );

  const { errorMsg, showErrorMsg } = useErrorMsg();

  return (
    <div className="RegisterPage Page">
      <h1>Register Page</h1>
      {isLoading && <Loader />}
      <form onSubmit={handleSubmit}>
        <label className="errorMsg">{errorMsg}</label>
        <input
          value={formValues.username}
          onChange={handleChange}
          type="text"
          placeholder="username"
          name="username"
          required
        />
        <input
          value={formValues.password}
          onChange={handleChange}
          type="password"
          placeholder="password"
          name="password"
          required
        />
        <button type="submit">Login</button>
      </form>
      <button onClick={() => navigate("/login")}>Login</button>
    </div>
  );
};

export default RegisterPage;
