import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoState {
  tasks: Todo[];
}
const initialState: TodoState = {
  tasks: [
    {
      id: 1,
      text: "Do something nice for someone you care about",
      completed: false,
    },
    {
      id: 2,
      text: "Memorize a poem",
      completed: true,
    },
    {
      id: 3,
      text: "Watch a classic movie",
      completed: true,
    },
  ],
};

export const TodosSlice = createSlice({
  initialState,
  name: "todos",
  reducers: {
    toggleComplete: (state, action: PayloadAction<{ id: number }>) => {
      const found = state.tasks.find((todo) => todo.id === action.payload.id);
      if (found) found.completed = !found.completed;
    },
  },
});

export const { toggleComplete } = TodosSlice.actions;
export default TodosSlice.reducer;
