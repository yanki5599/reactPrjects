import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export function createGenericFetchThunk<T>(prefix: string, url: string) {
  return createAsyncThunk(prefix, async (): Promise<T[]> => {
    console.log("in func");

    const response = await axios.get(url);
    console.log("response");

    return response.data;
  });
}
