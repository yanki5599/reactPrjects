import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../../types/user";
import axios from "axios";

interface UsersStateType {
  users: IUser[];
  status: "Idle" | "Pending" | "Fulfilled" | "Rejected";
  error: string;
}
const initialState: UsersStateType = {
  users: [],
  status: "Idle",
  error: "",
};

const fetchUsers = createAsyncThunk("users/get", async (): Promise<IUser[]> => {
  const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/users`);
  return response.data;
});

export const UsersSlice = createSlice({
  initialState,
  name: "users",
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "Pending";
        state.error = "";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.error = "";
        state.status = "Fulfilled";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.error = action.error.message || "error fetching users";
        state.status = "Rejected";
      });
  },
});

export const {} = UsersSlice.actions;
export default UsersSlice.reducer;
