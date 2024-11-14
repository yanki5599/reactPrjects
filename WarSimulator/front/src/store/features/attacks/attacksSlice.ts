import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Missile } from "../../../types/user";

interface Attack {
  _id: string;
  missileName: string;
  eta: Date;
  status: "Hit" | "Launched" | "Intercepted";
  missileId: Missile;
}

interface AttacksStateType {
  attacks: Attack[];
  status: "Idle" | "Pending" | "Fulfilled" | "Rejected";
  error: string;
}
const initialState: AttacksStateType = {
  attacks: [],
  status: "Idle",
  error: "",
};

export const fetchAttacks = createAsyncThunk(
  "attacks/get",
  async (): Promise<Attack[]> => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/attacker/attacks`
    );
    return response.data.data;
  }
);

export const AttacksSlice = createSlice({
  initialState,
  name: "attacks",
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchAttacks.pending, (state) => {
        state.status = "Pending";
        state.error = "";
      })
      .addCase(fetchAttacks.fulfilled, (state, action) => {
        state.error = "";
        state.status = "Fulfilled";
        state.attacks = action.payload;
      })
      .addCase(fetchAttacks.rejected, (state, action) => {
        state.error = action.error.message || "error fetching attacks";
        state.status = "Rejected";
      });
  },
});

export const {} = AttacksSlice.actions;
export default AttacksSlice.reducer;
