import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FloorreducerStateType {}
const initialState: FloorreducerStateType = {};

export const FloorreducerSlice = createSlice({
  initialState,
  name: "floorreducer",
  reducers: {
    changeAccess: (state, action: PayloadAction<{}>) => {},
  },
});

export const { addFloorreducer } = FloorreducerSlice.actions;
export default FloorreducerSlice.reducer;
