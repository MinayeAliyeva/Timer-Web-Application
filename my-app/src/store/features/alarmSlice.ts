import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IAlarmHistory {
  id: string;
  time: string;
  note: string;
  isActive: boolean;
  sound: string;
  date: string;
  isPastTime: boolean;
}
export interface IAlarmHistoryState {
  alarmHistory: IAlarmHistory[];
  openAlarmModal?: boolean;
  activeAlarm?: IAlarmHistory;
}

const initialState: IAlarmHistoryState = {
  alarmHistory: [],
};

export const alarmSlice = createSlice({
  name: "alarm",
  initialState,
  reducers: {
    setAlarm: (state, action) => {
      state.alarmHistory = [...state.alarmHistory, action.payload];
      // console.log("ALARM SLICE", );
    },
    setActiveAlarm:(state, action)=>{
      state.activeAlarm = action.payload;
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
    setOpenAlarmModal: (state, action) => {
      state.openAlarmModal = action.payload;
    },
  },
});

export const {
  setAlarm,
  toogleIsActive,
  deleteAlarm,
  clearAllAlarmHistory,
  updateAlarmTime,
  setOpenAlarmModal,
  setActiveAlarm
} = alarmSlice.actions;

export default alarmSlice.reducer;
