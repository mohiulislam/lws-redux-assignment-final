import { createSlice } from "@reduxjs/toolkit";

const playerSlice = createSlice({
  name: "video",
  initialState: {
    currentlyPlayingVideoId: 1,
  },
  reducers: {
    currentlyPlayed: (state, action) => {
      state.currentlyPlayingVideoId = action.payload;
    },
  },
});

export const { currentlyPlayed } = playerSlice.actions;
export default playerSlice.reducer;
