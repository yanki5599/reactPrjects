import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import roles from "../../../data/roles.json";

interface RolereducerStateType {
  currentRole: number;
}
const initialState: RolereducerStateType = {
  currentRole: 0,
};

export const RolereducerSlice = createSlice({
  initialState,
  name: "rolereducer",
  reducers: {
    setRole: (state, action: PayloadAction<number>) => {
      state.currentRole =
        action.payload < roles.length && action.payload >= 0
          ? action.payload
          : state.currentRole;
    },
  },
});

export const { setRole } = RolereducerSlice.actions;
export default RolereducerSlice.reducer;
