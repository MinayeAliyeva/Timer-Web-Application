import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { uid } from "uid";
import { ITime } from "../../modules";

interface ITimerState {
  time: ITime;
  isRunning: boolean;
  timeList: ITime[];
}
const initialState: ITimerState = {
  time: { h: 0, m: 0, s: 0 },
  isRunning: false,
  timeList: [],
};
const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    setTime(state, action: PayloadAction<ITime>) {
      state.time = { ...action.payload };
    },
    setIsRunning(state, action: PayloadAction<boolean>) {
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
      console.log("isExsits", isExsits);

      if (!isExsits)
        state.timeList = [...state.timeList, { ...action.payload, id: uid() }];
      console.log("stateTimelist", state.timeList);
    },
    deleteTime: (state, action: PayloadAction<ITime>) => {
      state.timeList = state.timeList.filter(
        (time) => time.id !== action.payload.id
      );
    },
  },
});

export const { setTime, setIsRunning, setPrevTimes, deleteTime } =
  timerSlice.actions;
export default timerSlice.reducer;
