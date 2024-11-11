import axios from "axios";
import { Status } from "../../../types/status";
import { IUser } from "../../../types/user";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface AuthStateType {
  token: string | null;
  user: IUser | null;
  status: Status;
  error: string;
}

const initialState: AuthStateType = {
  token: null,
  user: null,
  status: "Idle",
  error: "",
};

export const fetchValidateToken = createAsyncThunk(
  "auth/validateToken",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/validate`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || error?.response?.data?.message);
    }
  }
);
export const fetchLogin = createAsyncThunk(
  "auth/login",
  async (
    {
      username,
      password,
    }: {
      username: string;
      password: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/login`,
        { username, password }
      );
      console.log(response);

      return { user: response.data, token: response.headers.get };
    } catch (error: any) {
      console.log(error);

      return rejectWithValue(
        error?.response?.data?.message || error.message || "failed to login"
      );
    }
  }
);
export const fetchRegister = createAsyncThunk(
  "auth/register",
  async (
    {
      username,
      password,
    }: {
      username: string;
      password: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/register`,
        { username, password }
      );
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.message || error.response.data.message || "error registering"
      );
    }
  }
);

export const AuthSlice = createSlice({
  initialState,
  name: "auth",
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchValidateToken.pending, (state) => {
        state.status = "Pending";
        state.error = "";
      })
      .addCase(fetchValidateToken.fulfilled, (state, action) => {
        state.error = "";
        state.status = "Fulfilled";
        state.user = action.payload;
      })
      .addCase(fetchValidateToken.rejected, (state, action) => {
        state.error = action.error.message || "error fetching auth";
        state.status = "Rejected";
      })
      .addCase(fetchLogin.pending, (state) => {
        state.status = "Pending";
        state.error = "";
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.error = "";
        state.status = "Fulfilled";
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.error = (action.payload as string) || "error fetching auth";
        state.status = "Rejected";
      })
      .addCase(fetchRegister.pending, (state) => {
        state.status = "Pending";
        state.error = "";
      })
      .addCase(fetchRegister.fulfilled, (state) => {
        state.error = "";
        state.status = "Fulfilled";
      })
      .addCase(fetchRegister.rejected, (state, action) => {
        state.error =
          action.error.message ||
          (action.payload as string) ||
          "error fetching register";
        state.status = "Rejected";
      });
  },
});

export const { logout } = AuthSlice.actions;
export default AuthSlice.reducer;
