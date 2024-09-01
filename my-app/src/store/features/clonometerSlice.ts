import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITimeHistory } from "../../pages/chronometer/modules";

export interface ITimeHistoryState {
  timeHistory: ITimeHistory[];
}

const initialState: ITimeHistoryState = {
  timeHistory: [],
};

export const timeHistorySlice = createSlice({
  name: "clonometer",
  initialState,
  reducers: {
    setTimeHistoryAction: (
      state: ITimeHistoryState,
      action: PayloadAction<any>
    ) => {
      state.timeHistory = [...state.timeHistory, action?.payload];
      console.log("timeHistory", state?.timeHistory);
    },
    resetTimeHistory: (state: ITimeHistoryState) => {
      state.timeHistory = [...initialState.timeHistory];
    },
  },
});

export const { setTimeHistoryAction, resetTimeHistory } =
  timeHistorySlice.actions;

export default timeHistorySlice.reducer;
