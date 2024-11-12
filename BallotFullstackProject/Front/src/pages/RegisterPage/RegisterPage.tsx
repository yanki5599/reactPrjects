import React, { useEffect, useState } from "react";
import "./RegisterPage.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import useErrorMsg from "../../hooks/useErrorMsg";
import useForm from "../../hooks/useForm";
import { AppDispatch } from "../../store/store";
import {
  fetchRegister,
  fetchValidateToken,
} from "../../store/features/auth/authSlice";

interface MyFormValues {
  [key: string]: string;
}

const RegisterPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const initialValues: MyFormValues = { username: "", password: "" };

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async (values: MyFormValues) => {
    resetForm();
    setIsLoading(true);
    dispatch(fetchRegister(values as { username: string; password: string }))
      .then(() => {
        navigate("/login");
      })
      .catch((err) => showErrorMsg(err.message))
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
        <button type="submit">Sign Up</button>
      </form>
      <button onClick={() => navigate("/login")}>Go To Login</button>
    </div>
  );
};

export default RegisterPage;
