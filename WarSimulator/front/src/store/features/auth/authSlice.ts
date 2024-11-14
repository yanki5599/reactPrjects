import axios from "axios";
import { Status } from "../../../types/status";
import { IUser } from "../../../types/user";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

axios.defaults.withCredentials = true;

interface AuthStateType {
  user: IUser | null;
  status: Status;
  error: string;
}

const initialState: AuthStateType = {
  user: null,
  status: "Idle",
  error: "",
};

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

      return { user: response.data };
    } catch (error: any) {
      console.log(error);

      return rejectWithValue(
        error?.response?.data?.message || error.message || "failed to login"
      );
    }
  }
);
export const fetchLogout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await axios.get(`${import.meta.env.VITE_BACKEND_URL}/logout`);
    } catch (error: any) {
      return rejectWithValue("failed to logout");
    }
  }
);
export const fetchValidateToken = createAsyncThunk(
  "auth/validateToken",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/validate`
      );

      return response.data.data.user;
    } catch (error: any) {
      return rejectWithValue(error.message || error?.response?.data?.message);
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
        error.response.data.message || error.message || "error registering"
      );
    }
  }
);

export const fetchVote = createAsyncThunk(
  "users/vote",
  async ({ candidateId }: { candidateId: string }) => {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/users/vote`,
      { candidateId }
    );
    return response.data.data.votedForId;
  }
);
export const fetchCancelVote = createAsyncThunk(
  "users/cancel-vote",
  async () => {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/users/cancel-vote`
    );
    return response.data;
  }
);
export const AuthSlice = createSlice({
  initialState,
  name: "auth",
  reducers: {},
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
          (action.payload as string) ||
          action.error.message ||
          "error fetching register";
        state.status = "Rejected";
      })
      .addCase(fetchLogout.pending, (state) => {
        state.status = "Pending";
        state.error = "";
      })
      .addCase(fetchLogout.fulfilled, (state) => {
        state.error = "";
        state.status = "Fulfilled";
      })
      .addCase(fetchLogout.rejected, (state, action) => {
        state.error =
          action.error.message ||
          (action.payload as string) ||
          "error fetching register";
        state.status = "Rejected";
      })
      .addCase(fetchVote.pending, (state) => {
        state.status = "Pending";
        state.error = "";
      })
      .addCase(fetchVote.fulfilled, (state, action) => {
        state.error = "";
        state.status = "Fulfilled";
        state.user = { ...state.user!, votedForId: action.payload };
      })
      .addCase(fetchVote.rejected, (state, action) => {
        state.error = action.error.message || "error fetching users";
        state.status = "Rejected";
      })
      .addCase(fetchCancelVote.pending, (state) => {
        state.status = "Pending";
        state.error = "";
      })
      .addCase(fetchCancelVote.fulfilled, (state) => {
        state.error = "";
        state.status = "Fulfilled";
        state.user!.votedForId = null;
      })
      .addCase(fetchCancelVote.rejected, (state, action) => {
        state.error = action.error.message || "error fetching users";
        state.status = "Rejected";
      });
  },
});

export const {} = AuthSlice.actions;
export default AuthSlice.reducer;
