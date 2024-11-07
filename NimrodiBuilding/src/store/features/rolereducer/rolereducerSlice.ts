import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RolereducerStateType {
  
}
const initialState: RolereducerStateType = {  };

export const RolereducerSlice = createSlice({
  initialState,
  name: "rolereducer",
  reducers: {
    addRolereducer: (state, action: PayloadAction<{ rolereducer: Rolereducer }>) => {
      state.rolereducer.push(action.payload.rolereducer);
    },
  },
});

export const { addRolereducer } = RolereducerSlice.actions;
export default RolereducerSlice.reducer;
