import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  assignmentIdForEdit: null,
};

const assignmentSlice = createSlice({
  name: "assignment",
  initialState,
  reducers: {
    assignmentIdForEdit: (state, action) => {
      state.assignmentIdForEdit = action.payload;
    },
  },
});

export const { assignmentIdForEdit } = assignmentSlice.actions;
export default assignmentSlice.reducer;
