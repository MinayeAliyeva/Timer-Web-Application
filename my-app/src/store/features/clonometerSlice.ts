import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITimeHistory } from "../../pages/chronometer/modules";

export interface ITimeHistoryState {
  timeHistory: ITimeHistory[];
  timeList: any;
}

const initialState: ITimeHistoryState = {
  timeHistory: [],
  timeList: { min: 0, sec: 0, ms: 0 },
};

export const timeHistorySlice = createSlice({
  name: "clonometer",
  initialState,
  reducers: {
    setTimeHistoryAction: (
      state: ITimeHistoryState,
      action: PayloadAction<any>
    ) => {
      state.timeHistory = [...state.timeHistory, { ...action?.payload }];
    },
    resetTimeHistory: (state: ITimeHistoryState) => {
      state.timeHistory = [...initialState.timeHistory];
    },
    startTime: (state, action) => {
      state.timeList = { ...action.payload };
    },
    resetTime: (state) => {
      state.timeList = initialState.timeList;
    },
 
  },
});

export const {
  setTimeHistoryAction,
  resetTimeHistory,
  startTime,
  resetTime,
} = timeHistorySlice.actions;

export default timeHistorySlice.reducer;
