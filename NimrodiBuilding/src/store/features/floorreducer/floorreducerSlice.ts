import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import buildings from "../../../data/building.json";

interface FloorreducerStateType {
  floorAccess: boolean[];
}
const initialState: FloorreducerStateType = {
  floorAccess: new Array<boolean>(buildings.length).fill(true).fill(false, 1),
};

export const FloorreducerSlice = createSlice({
  initialState,
  name: "floorreducer",
  reducers: {
    changeAccess: (state, action: PayloadAction<number>) => {
      state.floorAccess[action.payload] = !state.floorAccess[action.payload];
    },
  },
});

export const { changeAccess } = FloorreducerSlice.actions;
export default FloorreducerSlice.reducer;
