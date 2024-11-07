import axios from "axios";
import { users } from "../data/users";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { save } from "../store/features/auth/authSlice";

const BASE_URL = "http://localhost:3001/api/auth";

export async function login({
  username,
  password,
}: {
  username: string;
  password: string;
}): Promise<boolean> {
  const dispatch = useDispatch();
  try {
    const response = await axios.post(`${BASE_URL}/login/token`, {
      username,
      password,
    });
    dispatch(save(response.data.token));
    return true;
  } catch (error: any) {
    const errorMessage = error.response.data.message || error.message;
    throw new Error(errorMessage);
  }
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
