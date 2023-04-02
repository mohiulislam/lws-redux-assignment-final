import apiSlice from "../api/apiSlice";
export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getVideos: builder.query({
      query: () => ({
        url: "/videos",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetVideosQuery } = authApi;
