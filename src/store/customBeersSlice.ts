import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BaseBeerT } from "types";

interface CustomBeersState {
  customBeers: BaseBeerT[];
}

const initialState: CustomBeersState = {
  customBeers: [],
};

export const customBeersSlice = createSlice({
  name: "customBeers",
  initialState,
  reducers: {
    addCustomBeer: (state, action: PayloadAction<BaseBeerT>) => {
      const customBeer = action.payload;
      const uniqueBeerNames = state.customBeers?.map((customBeer: BaseBeerT) => customBeer.name);
      if (uniqueBeerNames.includes(customBeer.name)) {
        alert("Beer name should be unique");
      } else {
        state.customBeers.push(customBeer);
      }
    },
  },
});

export const { addCustomBeer } = customBeersSlice.actions;

export default customBeersSlice.reducer;
