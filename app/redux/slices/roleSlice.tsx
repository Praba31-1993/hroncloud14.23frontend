import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
const initialState = {
  role: "SA",
};

const roleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {
    setRole: (state, action: PayloadAction<string>) => {
      state.role = action.payload;
    },
  },
});

export const initializeRole =
  (userProfile: any) => (dispatch: AppDispatch) => {
    if (userProfile !== undefined) {
      const firstUserRole = userProfile?.role;
      if (firstUserRole) {
        dispatch(setRole(firstUserRole));
      }
    }
  };

export const { setRole } = roleSlice.actions;
export default roleSlice.reducer;
