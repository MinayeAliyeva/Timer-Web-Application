import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { uid } from "uid";
import { ITime } from "../../modules";

interface ITimerState {
  time: ITime;
  isRunning?: boolean | null;
  timeList: ITime[];
  showTimeHistory: boolean;
  showHistory: boolean;
}
const initialState: ITimerState = {
  time: { h: 0, m: 0, s: 0, currentTime: false, showHistory: false },
  isRunning: null,
  timeList: [],
  showTimeHistory: false,
  showHistory: false,
};

const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    setTime(state, action: PayloadAction<ITime>) {
      state.time = { ...action.payload };
    },
    setIsRunning(state, action: PayloadAction<boolean | null>) {
      state.isRunning = action.payload;
    },
    setPrevTimes: (state, action: PayloadAction<ITime>) => {
      const isExsits = state.timeList.find((time) => {
        return (
          time.h === action.payload.h &&
          time.s === action.payload.s &&
          time.m === action.payload.m
        );
      });
      if (!isExsits)
        state.timeList = [
          ...state.timeList,
          { ...action.payload, id: uid() },
        ];
    },
    setPrevTimesByHistory: (state, action: PayloadAction<ITime[]>) => {
        state.timeList = [
        ...action.payload,
        ];
    },
    deleteTime: (state, action: PayloadAction<ITime>) => {
      state.timeList = state.timeList.filter(
        (time) => time.id !== action.payload.id
      );
    },
    setShowTimeHistory: (state, action) => {
      state.showTimeHistory = action.payload;
    },
    changeShowValue: (state, action: PayloadAction<boolean>) => {
      state.showHistory = action.payload;
    },
  },
});

export const {
  setTime,
  setIsRunning,
  setPrevTimes,
  deleteTime,
  setShowTimeHistory,
  changeShowValue,
  setPrevTimesByHistory
} = timerSlice.actions;
export default timerSlice.reducer;
