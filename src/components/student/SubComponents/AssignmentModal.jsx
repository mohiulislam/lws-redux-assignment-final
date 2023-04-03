import React from "react";
import { AiOutlineClose } from "react-icons/ai";
function AssignmentModal({ title, fullMark, setModalOpen }) {
  const {
    data: assignment,
    isLoading,
    isError,
  } = useGetAssignmentQuery(assignmentId);
  function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <div className="relative p-12 m-10 border-4 max-w-xl border-blue-950 rounded-md bg-primary font-HindSiliguri">
      <AiOutlineClose
        onClick={() => setModalOpen(false)}
        className="text-cyan-500 text-2xl absolute top-0 m-4 right-0"
      />
      <h1 className="text-2xl font-bold mb-6">
        <span className="text-cyan-400">এসাইনমেন্ট</span> জমা দিন
      </h1>
      <div className="border-[1px] pl-2 rounded-md my-10 p-6  border-blue-950">
        <h1 className="text-xl font-semibold mb-4 text-yellow-300">
          অ্যাসাইনমেন্ট ডেসক্রিপশন
        </h1>
        <p>Assignment 1 - Implement Debounce Function.</p>
      </div>
      <h1 className="bg-gradient-to-r from-cyan-500 to-blue-500 p-1 rounded-md inline-block  px-2 ">
        সর্বমোট নাম্বার - <span className="">100</span>
      </h1>
      <form className="mt-10">
        <label className="block" htmlFor="gitRepoLink">
          গিটহাব রিপোসিটরি লিঙ্ক <span className="text-red-500">*</span>
        </label>
        <input
          className="mt-2 bg-blue-950 rounded-md outline-none focus:ring-cyan-500 focus:ring-2 h-10 w-60"
          type="text"
          name=""
          id="gitRepoLink"
        />
        <button
          className=" mt-10 block from-cyan-500 bg-gradient-to-r to-blue-500 rounded-md p-2"
          type="submit"
          onClick={handleSubmit}
        >
          এসাইনমেন্ট জমা দিন
        </button>
      </form>
    </div>
  );
}

export default AssignmentModal;
