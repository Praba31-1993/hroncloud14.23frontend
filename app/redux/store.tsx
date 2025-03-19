import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "./slices/testdataSlice";
import colorSlice from "./slices/colorSlice";
import modeSlice from "./slices/modeSlice";
import dashboardLayoutSlice from "./slices/dashboardLayoutSlice";
import roleSlice from "./slices/roleSlice";
import loginSlice from "./slices/loginSlice";
import meetingModeBorderColorSlice from "./slices/meetingmodeSlice";
import bunitSlice from "./slices/bunitSlice";
// Create a store and add all reducers
export const store = configureStore({
  reducer: {
    login: loginSlice,
    testdata: dataSlice,
    color: colorSlice,
    mode: modeSlice,
    dashboardLayout: dashboardLayoutSlice,
    role: roleSlice,
    meetingmode: meetingModeBorderColorSlice,
    bussinessunit: bunitSlice,
  },
});

// Export store types for better TypeScript support
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
