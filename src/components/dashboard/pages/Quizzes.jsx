import React from "react";
import MainLayout from "../../layouts/MainLayout";
import Quiz from "../SubComponents/Quiz";

function Quizzes() {
  return (
    <MainLayout>
      <section class="py-6 bg-primary">
        <div class="mx-auto max-w-full px-5 lg:px-20">
          <div class="px-3 py-20 bg-opacity-10">
            <div class="w-full flex">
              <button class="btn ml-auto">Add Quiz</button>
            </div>
            <div class="overflow-x-auto mt-4">
              <table class="divide-y-1 text-base divide-gray-600 w-full">
                <thead>
                  <tr>
                    <th class="table-th">Question</th>
                    <th class="table-th">Video</th>
                    <th class="table-th justify-center">Action</th>
                  </tr>
                </thead>

                <tbody class="divide-y divide-slate-600/50">
                  <Quiz />
                  <Quiz />
                  <Quiz />
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
