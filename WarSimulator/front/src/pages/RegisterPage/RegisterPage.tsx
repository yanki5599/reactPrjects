import React, { useEffect, useState } from "react";
import "./RegisterPage.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import useErrorMsg from "../../hooks/useErrorMsg";
import useForm from "../../hooks/useForm";
import { AppDispatch, RootState } from "../../store/store";
import {
  fetchRegister,
  fetchValidateToken,
} from "../../store/features/auth/authSlice";

import { fetchOrgNames } from "../../store/features/organizations/organizationsSlice";

interface MyFormValues {
  [key: string]: string;
}

const RegisterPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  // fetch organizations names
  useEffect(() => {
    dispatch(fetchOrgNames())
      .unwrap()
      .catch((err) => showErrorMsg(err));
  }, []);

  const {
    organizations: organizations,
    error: orgError,
    status: orgStatus,
  } = useSelector((state: RootState) => state.organizations);

  const initialValues: MyFormValues = {
    username: "",
    password: "",
    organization: "",
    location: "",
  };

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async (values: MyFormValues) => {
    resetForm();
    const finalOrg =
      formValues["organization"] === "IDF"
        ? "IDF - " + formValues["location"]
        : formValues["organization"];

    if (!organizations.includes(finalOrg)) {
      showErrorMsg("invalid choose");
      return;
    }
    setIsLoading(true);
    dispatch(
      fetchRegister({ ...values, organization: finalOrg } as {
        username: string;
        password: string;
        organization: string;
      })
    )
      .unwrap()
      .then(() => {
        navigate("/login");
      })
      .catch((err) => showErrorMsg(err))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    showErrorMsg(orgError);
  }, [orgError]);

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
  console.log(formValues);

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
        {orgStatus === "Pending" && "Loading org names..."}
        {orgStatus === "Fulfilled" && (
          <div>
            <select
              value={formValues.organization}
              onChange={handleChange}
              name="organization"
              required
            >
              <option value="">Choose...</option>
              {[
                ...new Set(
                  organizations.map((org) =>
                    org.startsWith("IDF") ? "IDF" : org
                  )
                ),
              ].map((org) => (
                <option key={org} value={org}>
                  {org}
                </option>
              ))}
            </select>
            {formValues["organization"] === "IDF" && (
              <select
                onChange={handleChange}
                value={formValues.location}
                name="location"
              >
                <option value="">Choose...</option>
                {organizations
                  .filter((org) => org.startsWith("IDF"))
                  .map((org) => (
                    <option key={org} value={org.slice(6)}>
                      {org.slice(6)}
                    </option>
                  ))}
              </select>
            )}
          </div>
        )}
        <button type="submit">Sign Up</button>
      </form>
      <button onClick={() => navigate("/login")}>Go To Login</button>
    </div>
  );
};

function createOptions(organizations: string[]) {}
export default RegisterPage;
