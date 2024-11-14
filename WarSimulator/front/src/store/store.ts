import { configureStore } from "@reduxjs/toolkit";
import attacksReducer from "./features/attacks/attacksSlice";
import authReducer from "./features/auth/authSlice";
import organizationsReducer from "./features/organizations/organizationsSlice";

export const store = configureStore({
  reducer: {
    attacks: attacksReducer,
    organizations: organizationsReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
