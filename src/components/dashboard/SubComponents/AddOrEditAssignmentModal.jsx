import {
  useAddAssignmentMutation,
  useGetAssignmentsQuery,
  useUpdateAssignmentMutation,
} from "features/assignment/assignmentApi";
import { useGetVideosQuery } from "features/video/videoApi";
import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

function AddAssignmentModal({
  assignmentIdToEdit,
  setAssignmentIdToEdit,
  setModalOpen,
}) {
  const [title, setTitle] = useState("");

  const [totalMark, setTotalMark] = useState("");

  const [selectedVideoTitle, setSelectedVideoTitle] = useState("");

  const [selectedVideoId, setSelectedVideoId] = useState("");

  const {
    data: videos,
    isLoading: videosIsLoading,
    isError: videosIsError,
  } = useGetVideosQuery();

  const { data: assignments } = useGetAssignmentsQuery();
  const [updateAssignment] = useUpdateAssignmentMutation();
  const [addAssignment] = useAddAssignmentMutation();

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
    setAssignmentIdToEdit(null);
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
      <form onSubmit={handleSubmit} className="mt-10">
        <label className="block" htmlFor="title">
          এসাইনমেন্ট টাইটেল <span className="text-red-500">*</span>
        </label>
        <input
          required
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
          className="block w-full selectOptionHeight-16 bg-blue-950 h-10 outline-none"
        >
          <option value="default" hidden>
            ভিডিও সিলেক্ট করুন
          </option>
          {!videosIsLoading &&
            !videosIsError &&
            videos.length > 0 &&
            videos.map((video) => (
              <option key={video.id} data-id={video.id} value={video.title}>
                {video.title?.trim()?.match(/^(\S+\s+){0,7}\S+/)[0]}...
              </option>
            ))}
        </select>
        <button
          className=" mt-10 block from-cyan-500 bg-gradient-to-r to-blue-500 rounded-md p-2"
          type="submit"
        >
          {assignmentIdToEdit ? "এডিট" : "তৈরি"} করুন
        </button>
      </form>
    </div>
  );
}

export default AddAssignmentModal;
