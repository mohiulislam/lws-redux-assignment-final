import { createSlice } from "@reduxjs/toolkit";

const videoSlice = createSlice({
  name: "video",
  initialState: {
    videoIdToEdit: null,
  },
  reducers: {
    editVideo: (state, action) => {
      state.videoIdToEdit = action.payload;
    },
  },
});

export const { editVideo } = videoSlice.actions;
export default videoSlice.reducer;
