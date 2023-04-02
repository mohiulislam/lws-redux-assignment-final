import React from "react";

function AssignmentModal({ title, fullMark }) {
  return (
    <div className="p-12 m-10 border-4 border-blue-950 rounded-md bg-primary">
      <h1 className="mb-10">Assignment 1 - Implement Debounce Function</h1>
      <h1 className="bg-gradient-to-r from-cyan-500 to-blue-500 p-1 rounded-md inline-block font-HindSiliguri px-2 ">
        সর্বমোট নাম্বার - <span className="">100</span>
      </h1>

      <form className="mt-20">
        <label className="block" htmlFor="gitRepoLink">
          Your GitHub Repository Link1:
        </label>
        <input
          className="mt-8 bg-blue-950 rounded-md outline-none focus:ring-cyan-500 ring-2"
          type="text"
          name=""
          id="gitRepoLink"
        />
        <button className="ml-8 bg-cyan-500 rounded-md p-2" type="submit">
          Joma Din
        </button>
      </form>
    </div>
  );
}

export default AssignmentModal;
