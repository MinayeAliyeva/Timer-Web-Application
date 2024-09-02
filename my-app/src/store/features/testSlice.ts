import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  test: ['a'],
};

export const testSlice = createSlice({
  name: "clonometer",
  initialState,
  reducers: {
    setTest: (state, action) => {
      state.test = [...state.test, action.payload];
    },
  },
});

export const { setTest } = testSlice.actions;

export default testSlice.reducer;
