import apiSlice from "features/api/apiSlice";

export const quizMarkApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getQuizMarks: builder.query({
      query: () => ({
        url: `/quizMark`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetQuizMarksQuery } = quizMarkApi;
