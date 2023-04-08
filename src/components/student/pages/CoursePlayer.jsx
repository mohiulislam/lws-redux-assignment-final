import Error from "components/common/Error";
import Loader from "components/common/Loader";
import NotFound from "components/common/NotFound";
import MainLayout from "components/layouts/MainLayout";
import { useGetAssignmentQuery } from "features/assignment/assignmentApi";
import { useGetAssignmentMarksQuery } from "features/assignmentMark/assignmentMarkApi";
import { selectCurrentlyPlayingVideoId } from "features/player/playerSelectors";
import { useGetQuizMarksQuery } from "features/quizMark/quizMarkApi";
import useAuth from "hooks/useAuth";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useGetVideosQuery } from "../../../features/video/videoApi";

import SubmitAssignmentModal from "../SubComponents/SubmitAssignmentModal";
import VideoList from "../SubComponents/VideoList";

function CoursePlayer() {
  const auth = useAuth();

  const { data: assignmentMarks } = useGetAssignmentMarksQuery();

  const { data: quizMarks } = useGetQuizMarksQuery();

  const currentlyPlayingVideoId = useSelector(selectCurrentlyPlayingVideoId);

  const { data: assignment } = useGetAssignmentQuery(currentlyPlayingVideoId);

  const [{ id: assignmentId }] = assignment || [{}];

  const [
    isThisUserThisAssignmentSubmitted,
    setIsThisUserThisAssignmentSubmitted,
  ] = useState();
  const [isThisUserThisQuizSubmitted, setIsThisUserThisQuizSubmitted] =
    useState();

  useEffect(() => {
    if (quizMarks) {
      setIsThisUserThisQuizSubmitted(
        quizMarks.some((quizMark) => {
          console.log(1111111111);
          console.log(quizMark?.video_id, quizMark?.student_id);
          return quizMark?.video_id == currentlyPlayingVideoId &&
            quizMark?.student_id === auth?.user?.id
            ? true
            : false;
        })
      );
    }
  }, [quizMarks, auth?.user?.id, currentlyPlayingVideoId]);

  useEffect(() => {
    if (assignmentMarks) {
      setIsThisUserThisAssignmentSubmitted(
        assignmentMarks.some((assignmentMark) =>
          assignmentMark?.assignment_id === assignmentId &&
          assignmentMark?.student_id === auth?.user?.id
            ? true
            : false
        )
      );
    }
  }, [assignmentId, assignmentMarks, auth?.user?.id]);

  console.log(isThisUserThisAssignmentSubmitted);
  console.log(assignmentId);
  const {
    data: videos,
    isLoading: videosIsLoading,
    isError: videosIsError,
    error: videosError,
  } = useGetVideosQuery();

  const [createdAt, setCreatedAt] = useState("");
  useEffect(() => {
    if (videos) {
      const date = new Date(videos[currentlyPlayingVideoId - 1]?.createdAt);
      const formattedDate = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      setCreatedAt(formattedDate);
    }
  }, [videos, currentlyPlayingVideoId]);

  const [isModalOpen, setModalOpen] = useState(false);

  if (videosIsLoading) {
    return <Loader />;
  }

  if (videosIsError && !videosIsLoading) {
    return <Error message={videosError?.message || "server error"} />;
  }
  if (videosIsLoading && !videosIsError && videos.length === 0) {
    return <NotFound desire="video" />;
  }

  return (
    <MainLayout>
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-7xl px-5 lg:px-0">
          <div className="grid grid-cols-3 gap-2 lg:gap-8">
            <div className="col-span-full w-full space-y-8 lg:col-span-2">
              <iframe
                width="100%"
                className="aspect-video"
                src={videos && videos[currentlyPlayingVideoId - 1].url}
                title="Things I wish I knew as a Junior Web Developer - Sumit Saha - BASIS SoftExpo 2023"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>

              <div>
                <h1 className="text-lg font-semibold tracking-tight text-slate-100">
                  {videos && videos[currentlyPlayingVideoId - 1]?.title}
                </h1>
                <h2 className="pb-4 text-sm leading-[1.7142857] text-slate-400">
                  Uploaded on {createdAt}
                </h2>
                <div className="flex gap-4">
                  <button
                    disabled={isThisUserThisAssignmentSubmitted}
                    onClick={() => setModalOpen(true)}
                    className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary"
                  >
                    এসাইনমেন্ট
                  </button>
                  {isModalOpen && (
                    <SubmitAssignmentModal
                      setIsThisUserThisAssignmentSubmitted={
                        setIsThisUserThisAssignmentSubmitted
                      }
                      currentlyPlayingVideoId={currentlyPlayingVideoId}
                      setModalOpen={setModalOpen}
                    />
                  )}

                  <Link
                    to={
                      isThisUserThisQuizSubmitted
                        ? null
                        : `/Quizzes/${currentlyPlayingVideoId}`
                    }
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
