import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./features/todos/todosSlice";
import shoppingCartReducer from "./features/shoppingCart/shoppingCartSlice";

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    shoppingCart: shoppingCartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
