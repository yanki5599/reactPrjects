import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import roles from "../../../data/roles.json";

interface RolereducerStateType {
  role: string;
}
const initialState: RolereducerStateType = {
  role: roles[0],
};

export const RolereducerSlice = createSlice({
  initialState,
  name: "role",
  reducers: {
    setRole: (state, action: PayloadAction<number>) => {
      state.role =
        action.payload < roles.length && action.payload >= 0
          ? roles[action.payload]
          : state.role;
    },
  },
});

export const { setRole } = RolereducerSlice.actions;
export default RolereducerSlice.reducer;
