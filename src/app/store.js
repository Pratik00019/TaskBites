import { configureStore } from "@reduxjs/toolkit";
import biteReducer from "../features/biteSlice";

export const store = configureStore({
    reducer: {
        bites: biteReducer,
    },
  })