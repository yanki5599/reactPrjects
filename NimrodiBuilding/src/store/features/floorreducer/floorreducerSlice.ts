import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import buildings from "../../../data/building.json";

interface FloorreducerStateType {
  floors: { [floorName: string]: boolean };
}
const initialState: FloorreducerStateType = {
  floors: buildings.reduce(
    (obj, item) => Object.assign(obj, { [item.name]: false }),
    {}
  ),
};

export const FloorreducerSlice = createSlice({
  initialState,
  name: "floorreducer",
  reducers: {
    changeAccess: (state, action: PayloadAction<{ floorName: string }>) => {
      state.floors[action.payload.floorName] =
        !state.floors[action.payload.floorName];
    },
  },
});

export const { changeAccess } = FloorreducerSlice.actions;
export default FloorreducerSlice.reducer;
