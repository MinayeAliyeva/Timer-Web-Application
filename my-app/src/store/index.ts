import { configureStore } from "@reduxjs/toolkit";
import timeZoneSlice from "./features/timezoneSlice";
import timeHistorySlice from "./features/clonometerSlice";
import alarmSlice from "./features/alarmSlice";
import testSlice from "./features/testSlice";
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const store = configureStore({
  reducer: {
    timezones: timeZoneSlice,
    clonometer: timeHistorySlice,
    alarm: alarmSlice,
    test: testSlice,
  },
});

//Timezone selector
export const getCitiesSelector = (state: RootState) => state?.timezones.cities;
//Clonometer timeHistoryActionSlice selector
export const getTimeHistorySelector = (state: RootState) =>
  state?.clonometer.timeHistory;
//Alarm timeHistoryActionSlice selector
export const getAlarmHistory = (state: RootState) => state?.alarm.alarmHistory;
