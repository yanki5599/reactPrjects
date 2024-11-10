// features/users/usersSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User, RootState } from "../../../types/index";
import { createGenericFetchThunk } from "../../fetch";
import axios from "axios";

interface UsersStateType {
  users: User[];
  status: "Idle" | "Pending" | "Fulfilled" | "Rejected";
  error: string;
}

const initialState: UsersStateType = { users: [], status: "Idle", error: "" };

export const fetchUsers = createGenericFetchThunk<User>(
  "users/get",
  import.meta.env.VITE_USERS_BASE_URL
);

console.log();

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "Pending";
        state.error = "";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "Fulfilled";
        state.error = "";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.error = action.error.message || "";
        console.log("rejected users");
        state.status = "Rejected";
      });
  },
});

// שימוש בטיפוס RootState כדי להבטיח שהסלקטור מקבל את הסטייט הנכון
export const selectAllUsers = (state: RootState): User[] => state.users.users;

export default usersSlice.reducer;
