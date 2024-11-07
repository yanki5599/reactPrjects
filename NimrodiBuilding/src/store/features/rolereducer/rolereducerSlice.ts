import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import roles from "../../../data/roles.json";

interface RolereducerStateType {
  currentRole: string;
}
const initialState: RolereducerStateType = {
  currentRole: roles[0],
};

export const RolereducerSlice = createSlice({
  initialState,
  name: "rolereducer",
  reducers: {
    setRole: (state, action: PayloadAction<{ role: string }>) => {
      state.currentRole =
        action.payload.role in roles ? action.payload.role : state.currentRole;
    },
  },
});

export const { setRole } = RolereducerSlice.actions;
export default RolereducerSlice.reducer;
