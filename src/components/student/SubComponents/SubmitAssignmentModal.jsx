import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useGetAssignmentQuery } from "features/assignment/assignmentApi";
import { useSubmitAssignmentMutation } from "features/assignmentMark/assignmentMarkApi";
import { useSelector } from "react-redux";
import { selectAuth } from "features/auth/authSelector";

function SubmitAssignmentModal({ setModalOpen, currentlyPlayingVideoId }) {
  const {
    data: assignment,
    isLoading: assignmentIsLoading,
    isError: assignmentIsError,
  } = useGetAssignmentQuery(currentlyPlayingVideoId);

  const auth = useSelector(selectAuth);

  const [{ title, id, totalMark }] = assignment || [{}];

  const [submitAssignment, { isLoading, isSuccess, isError, error }] =
    useSubmitAssignmentMutation();

  const [gitRepo, setGitRepo] = useState();

  function handleSubmit(e) {
    e.preventDefault();
    const currentDate = new Date().toISOString();
    submitAssignment({
      repo_link: gitRepo,
      student_name: auth?.user?.name,
      assignment_id: id,
      student_id: 100,
      status: "pending",
      createdAt: currentDate,
      title,
    });
  }

  return (
    <div className="z-50 absolute right-1/2 translate-x-1/2 bottom-1/2 translate-y-1/2  p-12  border-4 w-full max-w-xl border-blue-950 rounded-md bg-primary font-HindSiliguri">
      <AiOutlineClose
        onClick={() => setModalOpen(false)}
        className="text-red-500 text-2xl absolute top-0 m-4 right-0"
      />
      <h1 className="text-2xl font-bold mb-6">
        <span className="text-cyan-400">এসাইনমেন্ট</span> জমা দিন
      </h1>
      <div className="border-[1px] pl-2 rounded-md my-10 p-6  border-blue-950">
        <h1 className="text-xl font-semibold mb-4 text-yellow-300">
          অ্যাসাইনমেন্ট ডেসক্রিপশন
        </h1>
        <p>{title}</p>
      </div>
      <h1 className="bg-gradient-to-r from-cyan-500 to-blue-500 p-1 rounded-md inline-block  px-2 ">
        সর্বমোট নাম্বার - <span className="">{totalMark}</span>
      </h1>
      <form onSubmit={handleSubmit} className="mt-10">
        <label className="block" htmlFor="gitRepoLink">
          গিটহাব রিপোসিটরি লিঙ্ক <span className="text-red-500">*</span>
        </label>
        <input
          required
          onChange={(e) => setGitRepo(e.target.value)}
          className="mt-2 bg-blue-950 rounded-md outline-none focus:ring-cyan-500 focus:ring-2 h-10 w-full"
          type="text"
          name=""
          id="gitRepoLink"
        />
        <button
          className=" mt-10 block from-cyan-500 bg-gradient-to-r to-blue-500 rounded-md p-2"
          type="submit"
        >
          এসাইনমেন্ট জমা দিন
        </button>
      </form>
    </div>
  );
}

export default SubmitAssignmentModal;
