import {
  useAddVideoMutation,
  useGetVideosQuery,
  useUpdateVideoMutation,
} from "features/video/videoApi";
import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

function AddOrEditVideoModal({
  videoIdToEdit,
  setVideoIdToEdit,
  setModalOpen,
}) {
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [url, setUrl] = useState(null);
  const [duration, setDuration] = useState(null);
  const [views, setViews] = useState(null);

  const [
    updateVideo,
    // {
    //   isLoading: updateLoading,
    //   isSuccess: updateSuccess,
    //   isError: updateIsError,
    //   error: updateError,
    // }
  ] = useUpdateVideoMutation();

  const [
    addVideo,
    // {
    //   isLoading: addLoading,
    //   isSuccess: addSuccess,
    //   isError: addIsError,
    //   error: addError,
    // }
  ] = useAddVideoMutation();

  function handleModalClose() {
    setModalOpen(false);
    setVideoIdToEdit(null);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const currentDate = new Date();
    !videoIdToEdit
      ? addVideo({
          title,
          description,
          url,
          views,
          duration,
          createdAt: currentDate.toISOString(),
        })
      : updateVideo({
          id: videoIdToEdit,
          data: {
            title,
            description,
            url,
            views,
            duration,
          },
        });
  }

  const {
    data: videos,
    // isLoading: videosIsLoading,
    // isError: videosIsError,
    // error: videosError,
  } = useGetVideosQuery();

  useEffect(() => {
    if (videoIdToEdit) {
      const videoToEdit = videos.find((video) => video.id === videoIdToEdit);
      setTitle(videoToEdit?.title);
      setDescription(videoToEdit?.description);
      setUrl(videoToEdit?.url);
      setViews(videoToEdit?.views);
      setDuration(videoToEdit?.duration);
    }
  }, [videoIdToEdit, videos]);

  return (
    <div className=" absolute right-1/2 translate-x-1/2 bottom-1/2 translate-y-1/2  p-12  border-4 w-full max-w-xl border-blue-950 rounded-md bg-primary font-HindSiliguri">
      <AiOutlineClose
        onClick={handleModalClose}
        className="text-red-500 text-2xl absolute top-0 m-4 right-0"
      />
      <h1 className="text-2xl font-bold mb-6">
        <span className="text-cyan-400">ভিডিও </span>
        {videoIdToEdit ? "এডিট" : "তৈরি"} করুন
      </h1>

      <form onSubmit={handleSubmit} className="mt-10">
        <label className="block" htmlFor="title">
          ভিডিও টাইটেল <span className="text-red-500">*</span>
        </label>
        <input
          required
          className=" mb-6  mt-2 bg-blue-950 rounded-md outline-none focus:ring-cyan-500 focus:ring-2 h-10 w-full"
          type="text"
          name=""
          id="title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <label className="block" htmlFor="description">
          ডেসক্রিপশন<span className="text-red-500">*</span>
        </label>
        <input
          required
          value={description}
          className="mt-2 mb-6 bg-blue-950 rounded-md outline-none focus:ring-cyan-500 focus:ring-2 h-10 w-full"
          type="text"
          name=""
          id="description"
          onChange={(e) => setDescription(e.target.value)}
        />
        <label className="block" htmlFor="url">
          ইউ আর এল<span className="text-red-500">*</span>
        </label>
        <input
          required
          value={url}
          className="mt-2 mb-6 bg-blue-950 rounded-md outline-none focus:ring-cyan-500 focus:ring-2 h-10 w-full"
          type="text"
          name=""
          id="url"
          onChange={(e) => setUrl(e.target.value)}
        />
        <label className="block" htmlFor="views">
          ভিউস <span className="text-red-500">*</span>
        </label>
        <input
          required
          value={views}
          className="mt-2 mb-6 bg-blue-950 rounded-md outline-none focus:ring-cyan-500 focus:ring-2 h-10 w-full"
          type="text"
          name=""
          id="views"
          onChange={(e) => setViews(e.target.value)}
        />
        <label className="block" htmlFor="duration">
          ডিউরেশন <span className="text-red-500">*</span>
        </label>
        <input
          required
          value={duration}
          className="mt-2 mb-6 bg-blue-950 rounded-md outline-none focus:ring-cyan-500 focus:ring-2 h-10 w-full"
          type="text"
          name=""
          id="duration"
          onChange={(e) => setDuration(e.target.value)}
        />
        <button
          className=" mt-10 block from-cyan-500 bg-gradient-to-r to-blue-500 rounded-md p-2"
          type="submit"
        >
          {videoIdToEdit ? "এডিট" : "তৈরি"} করুন
        </button>
      </form>
    </div>
  );
}

export default AddOrEditVideoModal;
