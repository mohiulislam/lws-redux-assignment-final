import apiSlice from "../api/apiSlice";
export const assignmentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    submitAssignment: builder.mutation({
      query: (data) => ({
        url: "/assignment",
        method: "POST",
        body: data,
      }),
    }),
    getAssignment: builder.query({
      query: (id) => ({
        url: `/assignment/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useSubmitAssignmentMutation, useGetAssignmentQuery } =
  assignmentApi;
