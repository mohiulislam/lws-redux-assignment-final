import apiSlice from "../api/apiSlice";

export const quizApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getQuizzes: builder.query({
      query: () => ({
        url: `/quizzes`,
        method: "GET",
      }),
    }),
    getQuizzesByVideo: builder.query({
      query: (id) => ({
        url: `/quizzes?video_id=${id}`,
        method: "GET",
      }),
    }),
    deleteQuiz: builder.mutation({
      query: (id) => ({
        url: `/quizzes/${id}`,
        method: "DELETE",
      }),
      onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData("getQuizzes", undefined, (draft) => {
            const index = draft.findIndex((quiz) => quiz.id === arg);
            if (index !== -1) {
              draft.splice(index, 1);
            }
          })
        );
        queryFulfilled.catch(patchResult.undo);
      },
    }),

    editQuiz: builder.mutation({
      query: ({ id, data }) => ({
        url: `/quizzes/${id}`,
        method: "PATCH",
        body: data,
      }),
      onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
        try {
          const { data: updatedQuiz } = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData("getQuizzes", undefined, (draft) => {
              const quizIndex = draft.findIndex(
                (quiz) => quiz.id === updatedQuiz.id
              );
              if (quizIndex !== -1) {
                draft[quizIndex] = updatedQuiz;
              }
            })
          );
        } catch (error) {
          console.error(error);
        }
      },
    }),
    addQuiz: builder.mutation({
      query: (data) => ({
        url: `/quizzes`,
        method: "POST",
        body: data,
      }),
      onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
        try {
          const { data: addedQuiz } = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData("getQuizzes", undefined, (draft) => {
              draft.push(addedQuiz);
            })
          );
        } catch (error) {
          console.error(error);
        }
      },
    }),
  }),
});

export const {
  useGetQuizzesQuery,
  useAddQuizMutation,
  useEditQuizMutation,
  useDeleteQuizMutation,
  useGetQuizzesByVideoQuery,
} = quizApi;
