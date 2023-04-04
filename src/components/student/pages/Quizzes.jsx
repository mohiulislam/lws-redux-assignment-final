import { selectCurrentlyPlayingVideoId } from "features/player/playerSelectors";
import { useGetQuizzesQuery } from "features/quiz/quizApi";
import React from "react";
import { useSelector } from "react-redux";
import MainLayout from "../../layouts/MainLayout";
import Quiz from "../SubComponents/Quiz";

function Quizzes() {
  const currentlyPlayingVideoId = useSelector(selectCurrentlyPlayingVideoId);
  const {
    data: quizzes,
    isLoading,
    isError,
  } = useGetQuizzesQuery(currentlyPlayingVideoId);
  console.log(quizzes);

  return (
    <MainLayout>
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-7xl px-5 lg:px-0">
          <div className="mb-8">
            <h1 className="text-2xl font-bold">
              Quizzes for "Debounce Function in JavaScript - JavaScript Job
              Interview question"
            </h1>
            <p className="text-sm text-slate-200">
              Each question contains 5 Mark
            </p>
          </div>
          <div className="space-y-8 ">
            {quizzes?.map((quiz) => (
              <Quiz quiz={quiz} />
            ))}
          </div>
          <button className="px-4 py-2 rounded-full bg-cyan block ml-auto mt-8 hover:opacity-90 active:opacity-100 active:scale-95 ">
            Submit
          </button>
        </div>
      </section>
    </MainLayout>
  );
}

export default Quizzes;
