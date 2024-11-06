import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthStateType {
  isLoggedIn: boolean;
}
const initialState: AuthStateType = {
  isLoggedIn: false,
};

export const AuthSlice = createSlice({
  initialState,
  name: "auth",
  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
    },
  },
});

export const { login, logout } = AuthSlice.actions;
export default AuthSlice.reducer;
