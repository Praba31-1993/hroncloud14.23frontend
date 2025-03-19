import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface DataState {
  data: { carts: any[] } | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: DataState = {
  data: null,
  isLoading: false,
  error: null,
};

export const fetchData = createAsyncThunk(
  "data/fetchData",
  async (_, thunkAPI) => {
    try {
      const response = await fetch("https://dummyjson.com/carts");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Slice
const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    clearData(state) {
      state.data = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearData } = dataSlice.actions;
export default dataSlice.reducer;
