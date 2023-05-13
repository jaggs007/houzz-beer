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
  async (queryParams: { page: number; itemsPerPage: number; searchTerm?: string }) => {
    const { page, itemsPerPage, searchTerm } = queryParams;
    let url = `${BEERS_API}?page=${page}&per_page=${itemsPerPage}`;

    if (searchTerm) {
      url += `&beer_name=${encodeURIComponent(searchTerm)}`;
    }

    const response = await fetch(url);
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
        const { searchTerm, page } = action.meta.arg;
        const newData = action.payload;

        state.loading = false;
        if (searchTerm && page === 1) {
          state.data = newData;
        } else {
          state.data = page === 1 ? newData : [...state.data, ...newData];
        }
      })
      .addCase(fetchBeers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Something went wrong";
      });
  },
});

export default beerSlice.reducer;
