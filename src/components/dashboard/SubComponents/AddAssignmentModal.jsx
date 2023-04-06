import {
  useAddAssignmentMutation,
  useGetAssignmentsQuery,
  useUpdateAssignmentMutation,
} from "features/assignment/assignmentApi";
import { selectAssignmentIdToEdit } from "features/assignment/assignmentSelectors";

import { editAssignment } from "features/assignment/assignmentSlice";
import { useGetVideosQuery } from "features/video/videoApi";
import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";

function AddAssignmentModal({ setModalOpen }) {
  const assignmentIdToEdit = useSelector(selectAssignmentIdToEdit);

  const [title, setTitle] = useState(null);

  const [totalMark, setTotalMark] = useState(null);

  const [selectedVideoTitle, setSelectedVideoTitle] = useState(null);

  const [selectedVideoId, setSelectedVideoId] = useState(null);
  const dispatch = useDispatch();
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
  const [
    updateAssignment,
    // {
    //   isLoading: updateLoading,
    //   isSuccess: updateSuccess,
    //   isError: updateIsError,
    //   error: updateError,
    // },
  ] = useUpdateAssignmentMutation();
  const [
    addAssignment,
    // {
    //   isLoading: addLoading,
    //   isSuccess: addSuccess,
    //   isError: addIsError,
    //   error: addError,
    // },
  ] = useAddAssignmentMutation();

  useEffect(() => {
    if (assignmentIdToEdit) {
      const assignmentToEdit = assignments.find(
        (assignment) => assignment.id === assignmentIdToEdit
      );
      setTitle(assignmentToEdit?.title?.match(/- (.*)/)?.[1]);
      setTotalMark(assignmentToEdit?.totalMark);
      setSelectedVideoTitle(assignmentToEdit?.video_title);
      setSelectedVideoId(assignmentToEdit?.video_id);
    }
  }, [assignmentIdToEdit, assignments]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!title || !totalMark || !selectedVideoTitle || !selectedVideoId) {
      alert("Please fill in all the required fields.");
      return;
    }

    !assignmentIdToEdit
      ? addAssignment({
          title: `Assignment ${assignments.length + 1} - ${title}`,
          video_title: selectedVideoTitle,
          totalMark,
          video_id: selectedVideoId,
        })
      : updateAssignment({
          id: assignmentIdToEdit,
          data: {
            title: `Assignment ${assignmentIdToEdit + 1} - ${title}`,
            video_title: selectedVideoTitle,
            totalMark,
            video_id: selectedVideoId,
          },
        });
  }
  function handleSelectVideoOnchange(e) {
    setSelectedVideoTitle(e.target.value);
    setSelectedVideoId(
      parseFloat(e.target.selectedOptions[0].getAttribute("data-id"))
    );
  }
  function handleModalClose() {
    setModalOpen(false);
    dispatch(editAssignment(null));
  }
  return (
    <div className=" absolute right-1/2 translate-x-1/2 bottom-1/2 translate-y-1/2  p-12  border-4 w-full max-w-xl border-blue-950 rounded-md bg-primary font-HindSiliguri">
      <AiOutlineClose
        onClick={handleModalClose}
        className="text-red-500 text-2xl absolute top-0 m-4 right-0"
      />
      <h1 className="text-2xl font-bold mb-6">
        <span className="text-cyan-400">এসাইনমেন্ট</span>
        {assignmentIdToEdit ? "এডিট" : "তৈরি"} করুন
      </h1>

      <form className="mt-10">
        <label className="block" htmlFor="title">
          এসাইনমেন্ট টাইটেল <span className="text-red-500">*</span>
        </label>
        <input
          required={true}
          className=" mb-6  mt-2 bg-blue-950 rounded-md outline-none focus:ring-cyan-500 focus:ring-2 h-10 w-full"
          type="text"
          name=""
          id="title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <label className="block" htmlFor="totalMark">
          সর্বমোট নম্বর <span className="text-red-500">*</span>
        </label>
        <input
          required
          value={totalMark}
          className="mt-2 mb-6 bg-blue-950 rounded-md outline-none focus:ring-cyan-500 focus:ring-2 h-10 w-full"
          type="number"
          name=""
          id="totalMark"
          onChange={(e) => setTotalMark(parseFloat(e.target.value))}
        />
        <select
          required
          onChange={handleSelectVideoOnchange}
          value={selectedVideoTitle}
          className="block selectOptionHeight-16 bg-blue-950 h-10 outline-none"
        >
          <option value="default" hidden>
            ভিডিও সিলেক্ট করুন
          </option>
          {!videosIsLoading &&
            !videosIsError &&
            videos.length > 0 &&
            videos
              .filter(
                (video) =>
                  !assignments.some(
                    (assignment) => assignment.video_id === video.id
                  )
              )
              .map((video) => (
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
          {assignmentIdToEdit ? "এডিট" : "তৈরি"} করুন
        </button>
      </form>
    </div>
  );
}

export default AddAssignmentModal;
