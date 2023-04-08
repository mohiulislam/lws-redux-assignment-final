import React from "react";

function QuizOption({ quizId, option: { id, option } }) {
  return (
    <label htmlFor={`option${id}_q${quizId}`}>
      <input  type="checkbox" id={`option${id}_q${quizId}`} />
      {option}
    </label>
  );
}

export default QuizOption;
