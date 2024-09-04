// timerSlice.js
import { createSlice } from "@reduxjs/toolkit";

const timerSlice = createSlice({
  name: "timer",
  initialState: {
    time: { h: 0, m: 0, s: 0 },
    isRunning: false,
  },
  reducers: {
    setTime(state, action) {
      state.time = action.payload;
    },
    setIsRunning(state, action) {
      state.isRunning = action.payload;
    },
  },
});

export const { setTime, setIsRunning } = timerSlice.actions;
export default timerSlice.reducer;
