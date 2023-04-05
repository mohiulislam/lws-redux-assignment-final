import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  assignmentIdToEdit: null,
};

const assignmentSlice = createSlice({
  name: "assignment",
  initialState,
  reducers: {
    editAssignment: (state, action) => {
      state.assignmentIdToEdit = action.payload;
    },
  },
});

export const { editAssignment } = assignmentSlice.actions;
export default assignmentSlice.reducer;
