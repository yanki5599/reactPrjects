import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICandidate } from "../../../types/candidate";
import axios from "axios";

interface CandidatesStateType {
  candidates: ICandidate[];
  status: "Idle" | "Pending" | "Fulfilled" | "Rejected";
  error: string;
}

const initialState: CandidatesStateType = {
  candidates: [],
  status: "Idle",
  error: "",
};

const fetchCandidates = createAsyncThunk(
  "users/get",
  async (): Promise<ICandidate[]> => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/candidates`
    );
    return response.data;
  }
);

export const CandidatesSlice = createSlice({
  initialState,
  name: "candidates",
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCandidates.pending, (state) => {
        state.status = "Pending";
        state.error = "";
      })
      .addCase(fetchCandidates.fulfilled, (state, action) => {
        state.error = "";
        state.status = "Fulfilled";
        state.candidates = action.payload;
      })
      .addCase(fetchCandidates.rejected, (state, action) => {
        state.error = action.error.message || "error fetching candidates";
        state.status = "Rejected";
      });
  },
});

export const {} = CandidatesSlice.actions;
export default CandidatesSlice.reducer;
