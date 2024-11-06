import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CounterStateType {
  counter: number;
}
const initialState: CounterStateType = { counter: 0 };

export const counterSlice = createSlice({
  initialState,
  name: "counter",
  reducers: {
    increment: (state) => {
      state.counter++;
    },
    decrement: (state) => {
      state.counter--;
    },
    setCounter: (state, action: PayloadAction<{ counter: number }>) => {
      state.counter = action.payload.counter;
    },
  },
});

export const { decrement, increment, setCounter } = counterSlice.actions;
export default counterSlice.reducer;
