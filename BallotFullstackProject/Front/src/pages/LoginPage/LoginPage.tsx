import React, { useEffect, useState } from "react";
import "./LoginPage.css";
import useForm from "../../hooks/useForm";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useErrorMsg from "../../hooks/useErrorMsg";
import Loader from "../../components/Loader/Loader";
import { AppDispatch } from "../../store/store";
import {
  fetchLogin,
  fetchValidateToken,
} from "../../store/features/auth/authSlice";

interface MyFormValues {
  [key: string]: string;
}

const LoginPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const initialValues: MyFormValues = { username: "", password: "" };
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async (values: MyFormValues) => {
    resetForm();

    setIsLoading(true);

    dispatch(fetchLogin(values as { username: string; password: string }))
      .unwrap()
      .then(() => {
        navigate("/votingPage");
      })
      .catch((err: any) => showErrorMsg(err))
      .finally(() => setIsLoading(false));
  };

  // check if already logged in
  useEffect(() => {
    dispatch(fetchValidateToken())
      .unwrap()
      .then(() => navigate("/"))
      .catch(() => {});
  }, []);

  const { formValues, handleChange, handleSubmit, resetForm } = useForm(
    initialValues,
    onSubmit
  );

  const { errorMsg, showErrorMsg } = useErrorMsg();

  return (
    <div className="LoginPage Page">
      <h1>Login Page</h1>
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
      <button onClick={() => navigate("/register")}>Register</button>
    </div>
  );
};

export default LoginPage;
