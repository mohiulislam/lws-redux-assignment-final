import apiSlice from "../api/apiSlice";
export const assignmentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    submitAssignment: builder.mutation({
      query: (data) => ({
        url: "/assignmentMark",
        method: "POST",
        body: data,
      }),
    }),
    getAssignmentMarks: builder.query({
      query: () => ({
        url: "/assignmentMark",
        method: "GET",
      }),
    }),
    submitAssignmentMark: builder.mutation({
      query: ({ data, id }) => ({
        url: `/assignmentMark/${id}`,
        method: "PATCH",
        body: data,
      }),
      onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
        try {
          const { data: updatedAssignmentMark } = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData(
              "getAssignmentMarks",
              undefined,
              (draft) => {
                const assignmentMarkIndex = draft.findIndex(
                  (assignmentsMark) => assignmentsMark.id === updatedAssignmentMark.id
                );
                if (assignmentMarkIndex !== -1) {
                  draft[assignmentMarkIndex] = updatedAssignmentMark;
                }
              }
            )
          );
        } catch (error) {
          console.error(error);
        }
      },
    }),
  }),
});

export const {
  useSubmitAssignmentMutation,
  useGetAssignmentMarksQuery,
  useSubmitAssignmentMarkMutation,
} = assignmentApi;
