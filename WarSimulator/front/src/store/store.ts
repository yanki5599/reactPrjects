import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/users/usersSlice";
import authReducer from "./features/auth/authSlice";
import candidatesReducer from "./features/candidates/candidatesSlice";

export const store = configureStore({
  reducer: {
    users: userReducer,
    candidates: candidatesReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
