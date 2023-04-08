import { current } from "@reduxjs/toolkit";
import Error from "components/common/Error";
import Loader from "components/common/Loader";
import NotFound from "components/common/NotFound";
import {
  useGetQuizzesByVideoQuery,
  useGetQuizzesQuery,
} from "features/quiz/quizApi";
import calculateQuizResult from "lib/calculateQuizResult";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import Quiz from "../SubComponents/Quiz";

function Quizzes() {
  const [quizResult, setQuizResult] = useState();

  const { videoId } = useParams();

  const {
    data: quizzes,
    isLoading: isLoadingQuiz,
    isError: isErrorQuiz,
    error: errorQuiz,
  } = useGetQuizzesByVideoQuery(videoId);

  const handleSubmit = (event) => {
    event.preventDefault();
    const selectedValues = [];
    const checkboxes = document.getElementsByTagName("input");
    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].type === "checkbox" && checkboxes[i].checked) {
        selectedValues.push({
          id: checkboxes[i].id,
          value: checkboxes[i].value,
        });
      }
    }
    setQuizResult(calculateQuizResult(quizzes, selectedValues));
  };
  console.log(quizResult);

  if (isLoadingQuiz) {
    return <Loader />;
  }
  if (!isLoadingQuiz && isErrorQuiz) {
    return <Error message={errorQuiz.message || "server error"} />;
  }
  if (!isLoadingQuiz && !isErrorQuiz && quizzes.length === 0) {
    return <NotFound desire="quiz" />;
  }

  // if (selectedValues) {
  //   console.log(selectedValues);
  // }

  return (
    <MainLayout>
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-7xl px-5 lg:px-0">
          <div className="mb-8">
            <h1 className="text-2xl font-bold">{quizzes[0].video_title}</h1>
            <p className="text-sm text-slate-200">
              Each question contains 5 Mark
            </p>
          </div>
          <div className="space-y-8 ">
            <form onSubmit={handleSubmit}>
              {quizzes?.map((quiz) => (
                <Quiz quiz={quiz} />
              ))}
              <button
                type="submit"
                className="bg-cyan-400 px-4 py-2 rounded-full bg-cyan block ml-auto mt-8 hover:opacity-90 text-black active:opacity-100 active:scale-95 "
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}

export default Quizzes;
