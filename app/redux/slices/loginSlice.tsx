import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "@/app/api/axiosInstance";

export interface LoginInterface {
  token: string;
  userInfo: any | null;
}

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (params: { usernameOrEmail: string; password: string }) => {
    try {
      const response = await axiosInstance.post("/api/auth/signin", params);
      return response.data;
    } catch (error) {
      console.error("Error during API call", error);

      if (error instanceof Error) {
        const axiosError = error as any;
        if (axiosError.response) {
          return {
            status: axiosError.response.status,
            message: axiosError.response.data.message,
          };
        }
        return { status: 500, message: error.message };
      }

      return { status: 500, message: "An unknown error occurred" };
    }
  }
);

const loginSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    status: null as number | null,
    error: null as string | null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.status = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = null;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 200;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        const { status, message } = action.payload as {
          status: number;
          message: string;
        };
        state.status = status;
        state.error = message || "Failed to login";
      });
  },
});

// Export actions and reducer
export const { logout } = loginSlice.actions;
export default loginSlice.reducer;
