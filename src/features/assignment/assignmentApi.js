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
    AddAssignment: builder.mutation({
      query: (data) => ({
        url: `/assignments`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAssignmentQuery,
  useGetAssignmentsQuery,
  useAddAssignmentMutation,
} = assignmentApi;
