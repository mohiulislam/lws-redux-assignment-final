import React from "react";
import { useGetVideosQuery } from "../../../features/video/videoApi";
import Error from "../../common/Error";
import Loader from "../../common/Loader";
import NotFound from "../../common/NotFound";
import VIdeoListVideo from "./VIdeoListVideo";

function VideoList() {
  const { data: videos, isLoading, isError, error } = useGetVideosQuery();

  let content;
  if (isLoading) {
    content = <Loader />;
  }

  if (!isLoading && isError) {
    content = <Error message={error} />;
  }

  if (!isLoading && !isError && videos?.length === 0) {
    content = <NotFound desire={"video"} />;
  }

  if (!isLoading && !isError && videos && videos.length > 0) {
    content = videos.map((video) => <VIdeoListVideo video={video} />);
  }
  return (
    <div className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto bg-secondary p-4 rounded-md border border-slate-50/10 divide-y divide-slate-600/30">
      {content}
    </div>
  );
}

export default VideoList;
