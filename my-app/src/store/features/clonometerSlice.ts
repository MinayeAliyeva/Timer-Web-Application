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
      console.log("timeHistory", state?.timeHistory);
    },
    resetTimeHistory: (state: ITimeHistoryState) => {
      state.timeHistory = [...initialState.timeHistory];
    },
    startTime: (state, action) => {
      console.log("clonometer slice", action.payload);
      // state.timeList = [...state.timeList, action.payload];
      state.timeList = { ...action.payload };
      console.log(state.timeList);
    },
  },
});

export const { setTimeHistoryAction, resetTimeHistory, startTime } =
  timeHistorySlice.actions;

export default timeHistorySlice.reducer;
// if (running) {
// let { min, sec, ms } = prevTime;
//......
// } else {
// console.log("PAUSE", running);
// setTime({ min: 0, sec: 0, ms: 0 });
// return () => {
//   if (intervalId) {
//     clearInterval(intervalId);
//   }
// };
// }
// return () => {
//   if (intervalId) {
//     clearInterval(intervalId);
//   }
// };
