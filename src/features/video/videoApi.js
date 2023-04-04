import apiSlice from "../api/apiSlice";
export const videoApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getVideos: builder.query({
      query: () => ({
        url: "/videos",
        method: "GET",
      }),
    }),
    getVideo: builder.query({
      query: (id) => ({
        url: `/videos/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetVideosQuery, useGetVideoQuery } = videoApi;
