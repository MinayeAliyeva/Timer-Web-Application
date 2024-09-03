import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IAlarmHistoryState {
  alarmHistory: {
    id: string;
    time: string;
    note: string;
    isActive: boolean;
    sound: string;
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
      console.log(action.payload);
      state.alarmHistory = [...state.alarmHistory, action.payload];
    },
    startAlarm: () => {},
    toogleIsActive: (state, action) => {
      console.log("TEST", action.payload.sound);
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
  },
});

export const {
  setAlarm,
  startAlarm,
  toogleIsActive,
  deleteAlarm,
  clearAllAlarmHistory,
} = alarmSlice.actions;

export default alarmSlice.reducer;
