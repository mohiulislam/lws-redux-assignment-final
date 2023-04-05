import {
  useAddAssignmentMutation,
  useGetAssignmentsQuery,
  useUpdateAssignmentMutation,
} from "features/assignment/assignmentApi";
import { selectAssignmentIdForEdit } from "features/assignment/assignmentSelectors";
import { useGetVideosQuery } from "features/video/videoApi";
import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useSelector } from "react-redux";

function AddAssignmentModal({ setModalOpen }) {
  const assignmentIdForEdit = useSelector(selectAssignmentIdForEdit);

  const [title, setTitle] = useState("");

  const [totalMark, setTotalMark] = useState("");

  const [selectedVideoTitle, setSelectedVideoTitle] = useState("");

  const [selectedVideoId, setSelectedVideoId] = useState(null);

  const {
    data: videos,
    isLoading: videosIsLoading,
    isError: videosIsError,
  } = useGetVideosQuery();

  const {
    data: assignments,
    // isLoading: assignmentsIsLoading,
    // isError: assignmentsIsError,
    // error: assignmentsError,
  } = useGetAssignmentsQuery();

  console.log(assignmentIdForEdit);

  useEffect(() => {
    if (assignmentIdForEdit) {
      const assignmentForEdit = assignments.find(
        (assignment) => assignment.id === assignmentIdForEdit
      );
      setTitle(assignmentForEdit?.title?.match(/- (.*)/)[1]);
      setTotalMark(assignmentForEdit?.totalMark);
      setSelectedVideoTitle(assignmentForEdit?.video_title);
    }
  }, []);

  const [
    addAssignment,
    {
      isLoading: addLoading,
      isSuccess: addSuccess,
      isError: addIsError,
      error: addError,
    },
  ] = useAddAssignmentMutation();
  const [
    updateAssignment,
    {
      isLoading: updateLoading,
      isSuccess: updateSuccess,
      isError: updateIsError,
      error: updateError,
    },
  ] = useUpdateAssignmentMutation();

  function handleSubmit(e) {
    e.preventDefault();
    addAssignment({
      title: `Assignment ${assignments.length + 1} ${title}`,
      video_title: selectedVideoTitle,
      totalMark,
      video_id: selectedVideoId,
    });
    updateAssignment({
      title: `Assignment ${assignments.length + 1} ${title}`,
      video_title: selectedVideoTitle,
      totalMark,
      video_id: selectedVideoId,
    })
  }
  function handleSelectVideoOnchange(e) {
    setSelectedVideoTitle(e.target.value);
    setSelectedVideoId(
      parseFloat(e.target.selectedOptions[0].getAttribute("data-id"))
    );
  }
  return (
    <div className=" absolute right-1/2 translate-x-1/2 bottom-1/2 translate-y-1/2  p-12  border-4 w-full max-w-xl border-blue-950 rounded-md bg-primary font-HindSiliguri">
      <AiOutlineClose
        onClick={() => setModalOpen(false)}
        className="text-red-500 text-2xl absolute top-0 m-4 right-0"
      />
      <h1 className="text-2xl font-bold mb-6">
        <span className="text-cyan-400">এসাইনমেন্ট</span>{" "}
        {assignmentIdForEdit ? "এডিট" : "তৈরি"} করুন
      </h1>

      <form className="mt-10">
        <label className="block" htmlFor="gitRepoLink">
          এসাইনমেন্ট টাইটেল <span className="text-red-500">*</span>
        </label>
        <input
          className=" mb-6  mt-2 bg-blue-950 rounded-md outline-none focus:ring-cyan-500 focus:ring-2 h-10 w-full"
          type="text"
          name=""
          id="gitRepoLink"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <label className="block" htmlFor="gitRepoLink">
          সর্বমোট নম্বর <span className="text-red-500">*</span>
        </label>
        <input
          value={totalMark}
          className="mt-2 mb-6 bg-blue-950 rounded-md outline-none focus:ring-cyan-500 focus:ring-2 h-10 w-full"
          type="text"
          name=""
          id="gitRepoLink"
          onChange={(e) => setTotalMark(e.target.value)}
        />
        <select
          onChange={handleSelectVideoOnchange}
          value={selectedVideoTitle}
          className="block selectOptionHeight-16 bg-blue-950 h-10 outline-none"
        >
          <option value="default" hidden>
            Select an option
          </option>
          {!videosIsLoading &&
            !videosIsError &&
            videos.length > 0 &&
            videos.map((video) => (
              <option key={video.id} data-id={video.id} value={video.title}>
                {video.title}
              </option>
            ))}
        </select>
        <button
          className=" mt-10 block from-cyan-500 bg-gradient-to-r to-blue-500 rounded-md p-2"
          type="submit"
          onClick={handleSubmit}
        >
          তৈরি করুন
        </button>
      </form>
    </div>
  );
}

export default AddAssignmentModal;
