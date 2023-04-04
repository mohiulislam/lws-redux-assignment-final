import { selectCurrentlyPlayingVideoId } from "features/player/playerSelectors";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useGetAssignmentQuery } from "../../../features/assignment/assignmentApi";
import { useGetVideosQuery } from "../../../features/video/videoApi";
import MainLayout from "../../layouts/MainLayout";
import AssignmentModal from "../SubComponents/AssignmentModal";
import VideoList from "../SubComponents/VideoList";

function CoursePlayer() {
  const currentlyPlayingVideoId = useSelector(selectCurrentlyPlayingVideoId);
  const {
    data: videos,
    isLoading: videosIsLoading,
    isError: videosIsError,
    error: videosError,
  } = useGetVideosQuery();

  const [isModalOpen, setModalOpen] = useState(false);
  return (
    <MainLayout>
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-7xl px-5 lg:px-0">
          <div className="grid grid-cols-3 gap-2 lg:gap-8">
            <div className="col-span-full w-full space-y-8 lg:col-span-2">
              <iframe
                width="100%"
                className="aspect-video"
                src={videos ? videos[currentlyPlayingVideoId - 1].url : null}
                title="Things I wish I knew as a Junior Web Developer - Sumit Saha - BASIS SoftExpo 2023"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>

              <div>
                <h1 className="text-lg font-semibold tracking-tight text-slate-100">
                  {videos ? videos[currentlyPlayingVideoId - 1].title : null}
                </h1>
                <h2 className="pb-4 text-sm leading-[1.7142857] text-slate-400">
                  Uploaded on 23 February 2020
                </h2>
                <div className="flex gap-4">
                  <button
                    onClick={() => setModalOpen(true)}
                    className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary"
                  >
                    এসাইনমেন্ট
                  </button>
                  <div className=" ">
                    {isModalOpen ? (
                      <AssignmentModal
                        currentlyPlayingVideoId={currentlyPlayingVideoId}
                        setModalOpen={setModalOpen}
                      />
                    ) : null}
                  </div>
                  <Link
                    to={`/Quizzes/${currentlyPlayingVideoId}`}
                    className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary"
                  >
                    কুইজে অংশগ্রহণ করুন
                  </Link>
                </div>
                <p className="mt-4 text-sm text-slate-400 leading-6">
                  {videos
                    ? videos[currentlyPlayingVideoId - 1].description
                    : null}
                </p>
              </div>
            </div>
            <VideoList />
          </div>
        </div>
      </section>
    </MainLayout>
  );
}

export default CoursePlayer;
