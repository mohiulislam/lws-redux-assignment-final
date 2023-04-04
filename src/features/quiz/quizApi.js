import apiSlice from "../api/apiSlice";

export const quizApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getQuizzes: builder.query({
      query: (videoId) => ({
        url: `/quizzes?video_id=${videoId}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetQuizzesQuery } = quizApi;
