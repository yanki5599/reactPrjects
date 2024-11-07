import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import buildings from "../../../data/building.json";

interface FloorreducerStateType {
  floors: boolean[];
}
const initialState: FloorreducerStateType = {
  floors: Array(buildings.length).fill(false),
};

export const FloorreducerSlice = createSlice({
  initialState,
  name: "floorreducer",
  reducers: {
    changeAccess: (state, action: PayloadAction<number>) => {
      state.floors[action.payload] = !state.floors[action.payload];
    },
  },
});

export const { changeAccess } = FloorreducerSlice.actions;
export default FloorreducerSlice.reducer;
