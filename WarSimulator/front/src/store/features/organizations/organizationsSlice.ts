import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface OrganizationsStateType {
  organizations: string[];
  status: "Idle" | "Pending" | "Fulfilled" | "Rejected";
  error: string;
}

const initialState: OrganizationsStateType = {
  organizations: [],
  status: "Idle",
  error: "",
};

export const fetchOrgNames = createAsyncThunk(
  "organizations/get",
  async (): Promise<string[]> => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/organization/all`
    );

    return response.data.data;
  }
);

export const OrganizationsSlice = createSlice({
  initialState,
  name: "organizations",
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOrgNames.pending, (state) => {
        state.status = "Pending";
        state.error = "";
      })
      .addCase(fetchOrgNames.fulfilled, (state, action) => {
        state.error = "";
        state.status = "Fulfilled";
        state.organizations = action.payload;
      })
      .addCase(fetchOrgNames.rejected, (state, action) => {
        state.error = action.error.message || "error fetching organizations";
        state.status = "Rejected";
      });
  },
});

export const {} = OrganizationsSlice.actions;
export default OrganizationsSlice.reducer;
