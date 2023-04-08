import apiSlice from "features/api/apiSlice";

export const quizMarkApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getQuizMarks: builder.query({
      query: () => ({
        url: `/quizMark`,
        method: "GET",
      }),
    }),
    sentQuizMarks: builder.mutation({
      query: (data) => ({
        url: `/quizMark`,
        method: "POST",
        body: data,
      }),
      onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
        try {
          const { data: addedQuizMark } = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData(
              "getQuizMarks",
              undefined,
              (draft) => {
                draft.push(addedQuizMark);
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

export const { useGetQuizMarksQuery, useSentQuizMarksMutation } = quizMarkApi;
