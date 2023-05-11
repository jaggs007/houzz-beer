import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import beersReducer from "./customBeersSlice";

const rootReducer = combineReducers({
  customBeers: beersReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default store;
