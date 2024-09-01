import { configureStore } from "@reduxjs/toolkit";
import timeZoneSlice from "./features/timezoneSlice";

export const store = configureStore({
  reducer: {
    timezones: timeZoneSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
