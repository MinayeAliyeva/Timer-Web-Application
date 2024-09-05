import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITimeHistory } from "../../pages/chronometer/modules";

export interface ITimeHistoryState {
  timeHistory: ITimeHistory[];
  timeList: { min: number; sec: number; ms: number };
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
      action: PayloadAction<ITimeHistory>
    ) => {
      state.timeHistory = [...state.timeHistory, action.payload];
    },
    resetTimeHistory: (state: ITimeHistoryState) => {
      state.timeHistory = initialState.timeHistory;
    },
    startTime: (state, action: PayloadAction<{ min: number; sec: number; ms: number }>) => {
      state.timeList = action.payload;
    },
    resetTime: (state) => {
      state.timeList = initialState.timeList;
    },
    resetRound: (state, action: PayloadAction<number>) => {
      state.timeHistory = state.timeHistory.filter(
        (item) => item.round !== action.payload
      );
    },
  },
});

export const {
  setTimeHistoryAction,
  resetTimeHistory,
  startTime,
  resetTime,
  resetRound,
} = timeHistorySlice.actions;

export default timeHistorySlice.reducer;
