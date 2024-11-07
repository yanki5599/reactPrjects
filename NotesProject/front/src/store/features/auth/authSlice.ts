import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthStateType {
  token: string;
}
const initialState: AuthStateType = {
  token: "",
};

export const AuthSlice = createSlice({
  initialState,
  name: "auth",
  reducers: {
    save: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    load: (state) => {
      state.token = localStorage.getItem("token") || "";
    },
    logout: (state) => {
      localStorage.removeItem("token");
      state.token = "";
    },
  },
});

export const { save, load, logout } = AuthSlice.actions;
export default AuthSlice.reducer;
