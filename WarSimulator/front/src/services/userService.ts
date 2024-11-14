import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import {
  fetchLogin,
  fetchRegister,
  fetchValidateToken,
} from "../store/features/auth/authSlice";

const BASE_URL = "http://localhost:3001/api/auth";

export async function login({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  const dispatch = useDispatch<AppDispatch>();
  dispatch(fetchLogin({ username, password }));
}

export async function register({
  username,
  password,
}: {
  username: string;
  password: string;
}): Promise<boolean> {
  try {
    await axios.post(`${BASE_URL}/register`, {
      username,
      password,
    });
    return true;
  } catch (error: any) {
    const errorMessage = error.response.data.message || error.message;
    throw new Error(errorMessage);
  }
}

export async function isLoggedIn(): Promise<boolean> {
  const { token } = useSelector((state: RootState) => state.auth);
  alert(token);

  try {
    await axios.get(`${BASE_URL}/protected/token`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return true;
  } catch (error: any) {
    const errorMessage = error.response.data.message || error.message;
    throw new Error(errorMessage);
  }
}
