import Error from "components/common/Error";
import Loader from "components/common/Loader";
import NotFound from "components/common/NotFound";
import { useGetVideosQuery } from "features/video/videoApi";
import React, { useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import AddOrEditVideoModal from "../SubComponents/AddOrEditVideoModal";
import Video from "../SubComponents/Video";

function Videos() {
  const {
    data: videos,
    isLoading: videosIsLoading,
    isError: videosIsError,
    error: videosError,
  } = useGetVideosQuery();

  const [isModalOpen, setModalOpen] = useState(false);

  const [videoIdToEdit, setVideoIdToEdit] = useState(null);

  let content;
  if (videosIsLoading) {
    content = <Loader />;
  }

  if (videosIsError && !videosIsLoading) {
    content = <Error message={videosError?.message || "server error"} />;
  }
  if (!videosIsLoading && !videosIsError && videos?.length === 0) {
    content = <NotFound desire="Videos" />;
  }

  if (!videosIsLoading && !videosIsError && videos?.length > 0) {
    content = videos?.map((video) => (
      <Video
        key={video.id}
        setVideoIdToEdit={setVideoIdToEdit}
        setModalOpen={setModalOpen}
        video={video || {}}
      />
    ));
  }
  return (
    <MainLayout>
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-full px-5 lg:px-20">
          <div className="px-3 py-20 bg-opacity-10">
            <div className="w-full flex">
              <button
                onClick={() => setModalOpen(true)}
                className="btn ml-auto"
              >
                Add Video
              </button>
              {isModalOpen && (
                <AddOrEditVideoModal
                  setVideoIdToEdit={setVideoIdToEdit}
                  videoIdToEdit={videoIdToEdit}
                  setModalOpen={setModalOpen}
                />
              )}
            </div>
            <div className="overflow-x-auto mt-4">
              <table className="divide-y-1 text-base divide-gray-600 w-full">
                <thead>
                  <tr>
                    <th className="table-th">Video Title</th>
                    <th className="table-th">Description</th>
                    <th className="table-th">Action</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-600/50">
                  {content}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}

export default Videos;
