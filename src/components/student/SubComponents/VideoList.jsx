import Error from "components/common/Error";
import Loader from "components/common/Loader";
import NotFound from "components/common/NotFound";
import { currentlyPlayed } from "features/player/playerSlice";
import { useGetVideosQuery } from "features/video/videoApi";
import React from "react";
import { useDispatch } from "react-redux";
import VIdeoListVideo from "./VIdeoListVideo";



function VideoList() {
  const dispatch = useDispatch();
  const { data: videos, isLoading, isError, error } = useGetVideosQuery();

  let content;
  if (1) {
    content = <Loader />;
  }
  if (!isLoading && isError) {
    content = <Error message={error.message || "Video not found"} />;
  }

  if (!isLoading && !isError && videos?.length === 0) {
    content = <NotFound desire={"video"} />;
  }

  if (!isLoading && !isError && videos && videos.length > 0) {
    content = videos.map((video) => (
      <div key={video.id} onClick={() => dispatch(currentlyPlayed(video.id))}>
        <VIdeoListVideo video={video} />
      </div>
    ));
  }
  return (
    <div className="relative col-span-full lg:col-auto max-h-[570px] overflow-y-auto bg-secondary p-4 rounded-md border border-slate-50/10 divide-y divide-slate-600/30">
      {content}
    </div>
  );
}

export default VideoList;
