import apiSlice from "../api/apiSlice";
export const assignmentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAssignment: builder.query({
      query: (id) => ({
        url: `/assignments?video_id=${id}`,
        method: "GET",
      }),
    }),
    getAssignments: builder.query({
      query: () => ({
        url: `/assignments`,
        method: "GET",
      }),
    }),
    addAssignment: builder.mutation({
      query: (data) => ({
        url: `/assignments`,
        method: "POST",
        body: data,
      }),
      onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
        try {
          const { data: addedAssignment } = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData(
              "getAssignments",
              undefined,
              (draft) => {
                draft.push(addedAssignment);
              }
            )
          );
        } catch (error) {
          console.error(error);
        }
      },
    }),
    updateAssignment: builder.mutation({
      query: ({ id, data }) => ({
        url: `/assignments/${id}`,
        method: "PATCH",
        body: data,
      }),
      onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
        try {
          const { data: updatedAssignment } = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData(
              "getAssignments",
              undefined,
              (draft) => {
                const assignmentIndex = draft.findIndex(
                  (assignments) => assignments.id === updatedAssignment.id
                );
                if (assignmentIndex !== -1) {
                  draft[assignmentIndex] = updatedAssignment;
                }
              }
            )
          );
        } catch (error) {
          console.error(error);
        }
      },
    }),
    deleteAssignment: builder.mutation({
      query: (id) => ({
        url: `/assignments/${id}`,
        method: "DELETE",
      }),
      onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData(
            "getAssignments",
            undefined,
            (draft) => {
              const index = draft.findIndex(
                (assignment) => assignment.id === arg
              );
              if (index !== -1) {
                draft.splice(index, 1);
              }
            }
          )
        );
        queryFulfilled.catch(patchResult.undo);
      },
    }),
  }),
});

export const {
  useGetAssignmentQuery,
  useGetAssignmentsQuery,
  useAddAssignmentMutation,
  useUpdateAssignmentMutation,
  useDeleteAssignmentMutation,
} = assignmentApi;
