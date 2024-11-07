import { configureStore } from "@reduxjs/toolkit";
import floorsReducer from "../store/features/floorreducer/floorreducerSlice";
import roleReducer from "../store/features/rolereducer/rolereducerSlice";

export const store = configureStore({
  reducer: {
    floors: floorsReducer,
    role: roleReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
