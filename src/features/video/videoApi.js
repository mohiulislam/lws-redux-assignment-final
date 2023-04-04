import apiSlice from "../api/apiSlice";
export const videoApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getVideos: builder.query({
      query: () => ({
        url: "/videos",
        method: "GET",
      }),
    }),
    getVideoByID: builder.query({
      query: (id) => ({
        url: `/videos/${id}`,
        method: "GET",
      }),
    }),
    getVideoByTitle: builder.query({
      query: (id) => ({
        url: `/videos/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetVideosQuery, useGetVideoQuery, useGetVideoByTitleQuery } =
  videoApi;
