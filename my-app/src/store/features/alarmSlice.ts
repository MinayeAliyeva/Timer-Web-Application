import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IAlarmHistoryState {
  alarmHistory: {
    id: string;
    time: string;
    note: string;
    isActive: boolean;
    sound: string;
    date: string;
    isPastTime: boolean;
  }[];
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
    toogleIsActive: (state, action) => {
      const alarmId = action.payload.alarmId;
      state.alarmHistory = state.alarmHistory.map((alarm: any) =>
        alarm.id === alarmId
          ? { ...alarm, isActive: !alarm.isActive, alarm: alarm.note }
          : alarm
      );
    },
    deleteAlarm: (state, action: PayloadAction<string>) => {
      const timeId = action.payload;
      state.alarmHistory = state.alarmHistory.filter(
        (time) => time.id !== timeId
      );
    },
    clearAllAlarmHistory: (state) => {
      state.alarmHistory = [...initialState.alarmHistory];
    },
    updateAlarmTime: (state, action) => {
      const { id, newTime, isActive } = action.payload;
      state.alarmHistory = state.alarmHistory.map((alarm) =>
        alarm.id === id ? { ...alarm, time: newTime, isActive } : alarm
      );
    },
  },
});

export const {
  setAlarm,
  toogleIsActive,
  deleteAlarm,
  clearAllAlarmHistory,
  updateAlarmTime,
} = alarmSlice.actions;

export default alarmSlice.reducer;
