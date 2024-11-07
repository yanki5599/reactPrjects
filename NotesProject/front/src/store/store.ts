import { configureStore } from "@reduxjs/toolkit";
import NotesReducer from "../store/features/notes/notesSlice";
import AuthReducer from "../store/features/auth/authSlice";

export const store = configureStore({
  reducer: {
    notes: NotesReducer,
    auth: AuthReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
