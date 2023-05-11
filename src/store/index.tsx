import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import customBeersReducer from "store/customBeersSlice";
import beersReducer from "store/beersSlice";

const rootReducer = combineReducers({
  customBeers: customBeersReducer,
  beers: beersReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default store;
