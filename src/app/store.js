import { configureStore } from "@reduxjs/toolkit";

import playerReducer from "features/player/playerSlice";
import apiSlice from "../features/api/apiSlice";
import authSliceReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSliceReducer,
    player: playerReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares().concat(apiSlice.middleware),
});
