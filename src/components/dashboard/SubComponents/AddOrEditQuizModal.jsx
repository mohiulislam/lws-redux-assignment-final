import {
  useAddQuizMutation,
  useEditQuizMutation,
  useGetQuizzesQuery,
} from "features/quiz/quizApi";
import { useGetVideosQuery } from "features/video/videoApi";
import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

function AddOrEditQuizModal({ quizIdToEdit, setQuizIdToEdit, setModalOpen }) {
  const [question, setQuestion] = useState("");
  const [option_1, setOption_1] = useState("");
  const [option_2, setOption_2] = useState("");
  const [option_3, setOption_3] = useState("");
  const [option_4, setOption_4] = useState("");

  const [option_1_checked, setOption_1_Checked] = useState(false);
  const [option_2_checked, setOption_2_Checked] = useState(false);
  const [option_3_checked, setOption_3_Checked] = useState(false);
  const [option_4_checked, setOption_4_Checked] = useState(false);

  const [selectedVideoId, setSelectedVideoId] = useState("");

  const [selectedVideoTitle, setSelectedVideoTitle] = useState("");

  const [
    addQuiz,
    {
      isLoading: isAddQuizLoading,
      isError: isAddQuizError,
      error: addQuizError,
    },
  ] = useAddQuizMutation();
  const [
    editQuiz,
    {
      isLoading: isEditQuizLoading,
      isError: isEditQuizError,
      error: editQuizError,
    },
  ] = useEditQuizMutation();

  const {
    data: videos,
    isLoading: videosIsLoading,
    isError: videosIsError,
  } = useGetVideosQuery();

  function handleModalClose() {
    setModalOpen(false);
    setQuizIdToEdit(null);
  }
  const {
    data: quizzes,
    // isLoading: quizzesIsLoading,
    // isError: quizzesIsError,
    // error: quizzesError,
  } = useGetQuizzesQuery();

  function handleSubmit(e) {
    if (!question || !option_1 || !option_2 || !option_3) {
      alert("Please fill required field");
      return;
    }

    e.preventDefault();
    !quizIdToEdit
      ? addQuiz({
          question,
          video_id: selectedVideoId,
          video_title: selectedVideoTitle,
          options: [
            { id: 1, option: option_1, isCorrect: option_1_checked },
            { id: 2, option: option_2, isCorrect: option_2_checked },
            { id: 3, option: option_3, isCorrect: option_3_checked },
            { id: 4, option: option_4, isCorrect: option_4_checked },
          ],
        })
      : editQuiz({
          id: quizIdToEdit,
          data: {
            question,
            video_id: selectedVideoId,
            video_title: selectedVideoTitle,
            options: [
              { id: 1, option: option_1, isCorrect: option_1_checked },
              { id: 2, option: option_2, isCorrect: option_2_checked },
              { id: 3, option: option_3, isCorrect: option_3_checked },
              { id: 4, option: option_4, isCorrect: option_4_checked },
            ],
          },
        });
  }
  function handleSelectVideoOnchange(e) {
    setSelectedVideoTitle(e.target.value);
    setSelectedVideoId(
      parseFloat(e.target.selectedOptions[0].getAttribute("data-id"))
    );
  }
  useEffect(() => {
    if (quizIdToEdit) {
      const quizToEdit = quizzes.find((quiz) => quiz.id === quizIdToEdit);
      setQuestion(quizToEdit?.question);
      setOption_1(quizToEdit?.options?.[0]?.option);
      setOption_2(quizToEdit?.options?.[1]?.option);
      setOption_3(quizToEdit?.options?.[2]?.option);
      setOption_4(quizToEdit?.options?.[3]?.option);
      setOption_1_Checked(quizToEdit?.options?.[0]?.isCorrect);
      setOption_2_Checked(quizToEdit?.options?.[1]?.isCorrect);
      setOption_3_Checked(quizToEdit?.options?.[2]?.isCorrect);
      setOption_4_Checked(quizToEdit?.options?.[3]?.isCorrect);
      setSelectedVideoTitle(quizToEdit?.video_title);
      setSelectedVideoId(quizToEdit?.video_id);
    }
  }, [quizIdToEdit, quizzes]);

  return (
    <div className=" absolute right-1/2 translate-x-1/2 bottom-1/2 translate-y-1/2  p-12  border-4 w-full max-w-xl border-blue-950 rounded-md bg-primary font-HindSiliguri py-5">
      <AiOutlineClose
        onClick={handleModalClose}
        className="text-red-500 text-2xl absolute top-0 m-4 right-0"
      />
      <h1 className="text-2xl font-bold mb-6">
        <span className="text-cyan-400">কুইজ </span>
        {quizIdToEdit ? "এডিট" : "তৈরি"} করুন
      </h1>
      <p className="text-yellow-400">সঠিক উত্তরের টিক চিহ্ন দিন।</p>
      <form className="mt-10">
        <label className="block" htmlFor="question">
          প্রশ্ন<span className="text-red-500">*</span>
        </label>
        <input
          required
          className=" mb-6  mt-2 bg-blue-950 rounded-md outline-none focus:ring-cyan-500 focus:ring-2 h-10 w-full"
          type="text"
          name=""
          id="question"
          onChange={(e) => setQuestion(e.target.value)}
          value={question}
        />

        <div className="flex">
          <input
            type="checkbox"
            id="option_1_checkbox"
            name="option_1_checkbox"
            value="option_1_checkbox"
            className=" mr-5 w-7 "
            checked={option_1_checked}
            onChange={(e) => setOption_1_Checked(e.target.checked)}
          />
          <div className="grow">
            <label className="block" htmlFor="option_1">
              অপশন<span className="text-red-500">*</span>
            </label>
            <input
              required
              value={option_1}
              className=" mb-4 bg-blue-950 rounded-md outline-none focus:ring-cyan-500 focus:ring-2 h-10 w-full"
              type="text"
              name=""
              id="option_1"
              onChange={(e) => setOption_1(e.target.value)}
            />
          </div>
        </div>
        <div className="flex">
          <input
            type="checkbox"
            id="option_2_checkbox"
            name="option_2_checkbox"
            value="option_2_checkbox"
            className=" mr-5 w-7 "
            checked={option_2_checked}
            onChange={(e) => setOption_2_Checked(e.target.checked)}
          />
          <div className="grow">
            <label className="block" htmlFor="option_2">
              অপশন<span className="text-red-500">*</span>
            </label>
            <input
              required
              value={option_2}
              className="mb-4 bg-blue-950 rounded-md outline-none focus:ring-cyan-500 focus:ring-2 h-10 w-full"
              type="text"
              name=""
              id="option_2"
              onChange={(e) => setOption_2(e.target.value)}
            />
          </div>
        </div>
        <div className="flex">
          <input
            type="checkbox"
            id="option_3_checkbox"
            name="option_3_checkbox"
            value="option_3_checkbox"
            className=" mr-5 w-7 "
            checked={option_3_checked}
            onChange={(e) => setOption_3_Checked(e.target.checked)}
          />
          <div className="grow">
            <label className="block" htmlFor="option_2">
              অপশন<span className="text-red-500">*</span>
            </label>
            <input
              required
              value={option_3}
              className="mb-6 bg-blue-950 rounded-md outline-none focus:ring-cyan-500 focus:ring-2 h-10 w-full"
              type="text"
              name=""
              id="option_3"
              onChange={(e) => setOption_3(e.target.value)}
            />
          </div>
        </div>
        <div className="flex">
          <input
            type="checkbox"
            id="option_4_checkbox"
            name="option_4_checkbox"
            value="option_4_checkbox"
            className=" mr-5 w-7 "
            checked={option_4_checked}
            onChange={(e) => setOption_4_Checked(e.target.checked)}
          />
          <div className="grow">
            <label className="block" htmlFor="option_4">
              অপশন <span className="text-red-500">*</span>
            </label>
            <input
              required
              value={option_4}
              className="mb-6 bg-blue-950 rounded-md outline-none focus:ring-cyan-500 focus:ring-2 h-10 w-full"
              type="text"
              name=""
              id="option_4"
              onChange={(e) => setOption_4(e.target.value)}
            />
          </div>
        </div>
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
            videos?.length > 0 &&
            videos?.map((video) => {
              return (
                <option key={video.id} data-id={video.id} value={video.title}>
                  {video.title?.trim()?.match(/^(\S+\s+){0,7}\S+/)[0]}...
                </option>
              );
            })}
        </select>
        <button
          className=" mt-8 block from-cyan-500 bg-gradient-to-r to-blue-500 rounded-md p-2"
          type="submit"
          onClick={handleSubmit}
        >
          {quizIdToEdit ? "এডিট" : "তৈরি"} করুন
        </button>
      </form>
    </div>
  );
}

export default AddOrEditQuizModal;
