import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IAlarmHistoryState {
  alarmHistory: { id: string; time: string; note: string; isActive: boolean }[];
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
  },
});

export const { setAlarm, startAlarm, toogleIsActive, deleteAlarm } =
  alarmSlice.actions;

export default alarmSlice.reducer;
