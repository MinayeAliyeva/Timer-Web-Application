import { createSlice } from "@reduxjs/toolkit";

export interface IAlarmHistoryState {
  alarmHistory: any;
}

const initialState: IAlarmHistoryState = {
  alarmHistory: [],
};

export const alarmSlice = createSlice({
  name: "clonometer",
  initialState,
  reducers: {
    setAlarm: (state, action) => {
      state.alarmHistory = [...state.alarmHistory, action.payload];
    },
    startAlarm: () => {},
    toogleIsActive: (state, action) => {
      const alarmId = action.payload.alarmId;
      state.alarmHistory = state.alarmHistory.map((alarm: any) =>
        alarm.id === alarmId ? { ...alarm, isActive: !alarm.isActive } : alarm
      );
    },
  },
});

export const { setAlarm, startAlarm, toogleIsActive } = alarmSlice.actions;

export default alarmSlice.reducer;
