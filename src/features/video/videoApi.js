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
    deleteVideo: builder.mutation({
      query: (id) => ({
        url: `/videos/${id}`,
        method: "DELETE",
      }),
      onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData("getVideos", undefined, (draft) => {
            const index = draft.findIndex((video) => video.id === arg);
            if (index !== -1) {
              draft.splice(index, 1);
            }
          })
        );
        queryFulfilled.catch(patchResult.undo);
      },
    }),
    updateVideo: builder.mutation({
      query: ({ id, data }) => ({
        url: `/videos/${id}`,
        method: "PATCH",
        body: data,
      }),
      onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
        try {
          const { data: updatedVideo } = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData("getVideos", undefined, (draft) => {
              const videoIndex = draft.findIndex(
                (videos) => videos.id === updatedVideo.id
              );
              if (videoIndex !== -1) {
                draft[videoIndex] = updatedVideo;
              }
            })
          );
        } catch (error) {
          console.error(error);
        }
      },
    }),
    addVideo: builder.mutation({
      query: (data) => ({
        url: `/videos`,
        method: "POST",
        body: data,
      }),
      onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
        try {
          const { data: addedVideo } = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData("getVideos", undefined, (draft) => {
              draft.push(addedVideo);
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
  useGetVideosQuery,
  useAddVideoMutation,
  useUpdateVideoMutation,
  useGetVideoQuery,
  useDeleteVideoMutation,
} = videoApi;
