"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bunit: "",
};

const bunitSlice = createSlice({
  name: "businessunit",
  initialState,
  reducers: {
    setBunit: (state, action) => {
      state.bunit = action.payload;
    },
  },
});

export const { setBunit } = bunitSlice.actions;
export default bunitSlice.reducer;
