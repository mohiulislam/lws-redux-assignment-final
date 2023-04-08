import Error from "components/common/Error";
import Loader from "components/common/Loader";
import NotFound from "components/common/NotFound";
import MainLayout from "components/layouts/MainLayout";
import { useGetQuizzesQuery } from "features/quiz/quizApi";
import React, { useState } from "react";
import AddOrEditQuizModal from "../SubComponents/AddOrEditQuizModal";
import Quiz from "../SubComponents/Quiz";

function Quizzes() {
  const {
    data: quizzes,
    isLoading: quizzesIsLoading,
    isError: quizzesIsError,
    error: quizzesError,
  } = useGetQuizzesQuery();

  const [isModalOpen, setModalOpen] = useState(false);

  const [quizIdToEdit, setQuizIdToEdit] = useState(null);
  let content;
  if (quizzesIsLoading) {
    content = <Loader />;
  }

  if (quizzesIsError && !quizzesIsLoading) {
    content = <Error message={quizzesError?.message || "server error"} />;
  }
  if (!quizzesIsLoading && !quizzesIsError && quizzes?.length === 0) {
    content = <NotFound desire="quizzes" />;
  }

  if (!quizzesIsLoading && !quizzesIsError && quizzes?.length > 0) {
    content = quizzes?.map((quiz) => (
      <Quiz
        key={quiz.id}
        setQuizIdToEdit={setQuizIdToEdit}
        setModalOpen={setModalOpen}
        quiz={quiz || {}}
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
                Add Quiz
              </button>
              {isModalOpen && (
                <AddOrEditQuizModal
                  setQuizIdToEdit={setQuizIdToEdit}
                  quizIdToEdit={quizIdToEdit}
                  setModalOpen={setModalOpen}
                />
              )}
            </div>
            <div className="overflow-x-auto mt-4">
              <table className="divide-y-1 text-base divide-gray-600 w-full">
                <thead>
                  <tr>
                    <th className="table-th">Question</th>
                    <th className="table-th">Video</th>
                    <th className="table-th justify-center">Action</th>
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

export default Quizzes;
