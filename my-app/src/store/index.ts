import { configureStore } from "@reduxjs/toolkit";
import timeZoneSlice from "./features/timezoneSlice";
import timeHistorySlice from "./features/clonometerSlice";
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const store = configureStore({
  reducer: {
    timezones: timeZoneSlice,
    clonometer: timeHistorySlice,
  },
});

//Timezone selector
export const getCitiesSelector = (state: RootState) => state.timezones.cities;
//Clonometer timeHistoryActionSlice selector
export const getTimeHistorySelector=(state:RootState)=>state?.clonometer.timeHistory