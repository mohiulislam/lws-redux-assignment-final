import { configureStore } from "@reduxjs/toolkit";
import assignmentReducer from "features/assignment/assignmentSlice";
import playerReducer from "features/player/playerSlice";
import videoReducer from "features/video/videoSlice";
import apiSlice from "../features/api/apiSlice";
import authSliceReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSliceReducer,
    player: playerReducer,
    assignment: assignmentReducer,
    video: videoReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares().concat(apiSlice.middleware),
});
