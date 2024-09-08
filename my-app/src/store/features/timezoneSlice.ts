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
      const cityExists = state?.cities.find((city) => city === action?.payload);
      if (!cityExists) {
        state.cities = [...state.cities, action.payload];
      }
    },
    deleteCity: (state, action) => {
      state.cities = state.cities.filter(
        (city) => city.split("/")[1] !== action.payload
      );
    },
    deleteAllTimes: (state) => {
      state.cities = [...initialState.cities];
    },
    sortByTimeZoneNameAsc: (state) => {
      state.cities = state.cities.sort((a, b) =>
        a.split("/")[1].localeCompare(b.split("/")[1])
      );
    },
    sortByTimeZoneNameDesc: (state) => {
      state.cities = state.cities.sort((a, b) =>
        b.split("/")[1].localeCompare(a.split("/")[1])
      );
    },
  },
});

export const {
  setCity,
  deleteCity,
  deleteAllTimes,
  sortByTimeZoneNameAsc,
  sortByTimeZoneNameDesc,
} = timeZoneSlice.actions;

export default timeZoneSlice.reducer;
