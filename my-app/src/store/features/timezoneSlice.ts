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
      console.log('ac',action.payload);
      
      state.cities = state.cities.filter((city) => city.split('/')[1] !== action.payload);
    },
  },
});

export const { setCity, deleteCity } = timeZoneSlice.actions;

export default timeZoneSlice.reducer;
