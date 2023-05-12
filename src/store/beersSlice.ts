import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BeerResponseT } from "types";
import { BEERS_API } from "constant";

export interface BeerState {
  data: BeerResponseT[];
  loading: boolean;
  error: string | null;
}

const initialState: BeerState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchBeers = createAsyncThunk(
  "beers/fetchBeers",
  async (queryParams: { page: number; itemsPerPage: number }) => {
    const { page, itemsPerPage } = queryParams;
    const response = await fetch(`${BEERS_API}?page=${page}&per_page=${itemsPerPage}`);
    const data = await response.json();
    return data as BeerResponseT[];
  },
);

export const beerSlice = createSlice({
  name: "beers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBeers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBeers.fulfilled, (state, action) => {
        state.loading = false;
        state.data = [...state.data, ...action.payload];
      })
      .addCase(fetchBeers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Something went wrong";
      });
  },
});

export default beerSlice.reducer;
