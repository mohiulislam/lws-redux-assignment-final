import apiSlice from "../api/apiSlice";
export const videoApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getVideos: builder.query({
      query: () => ({
        url: "/videos",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetVideosQuery } = videoApi;
