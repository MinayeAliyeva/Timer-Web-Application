import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ITimeZone {
  cities: string[];
}

const initialState: ITimeZone = {
  cities: ["Asia/Baku"],
};

export const timeZoneSlice = createSlice({
  name: "timezone",
  initialState,
  reducers: {
    setCity: (state: ITimeZone, action: PayloadAction<string>) => {
      console.log("action", action.payload);
      const cityExists = state?.cities.find((city) => city === action?.payload);
      if (!cityExists) {
        state.cities = [...state.cities, action.payload];
      }
    },
  },
});

export const { setCity } = timeZoneSlice.actions;

export default timeZoneSlice.reducer;
