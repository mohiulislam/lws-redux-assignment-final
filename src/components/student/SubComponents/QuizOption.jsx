import React from "react";

//option1_q1

function QuizOption({ quizId, option: { id, option } }) {
  return (
    <label htmlFor={`option${id}_q${quizId}`}>
      <input type="checkbox" id={`option${id}_q${quizId}`} />
      {option}
    </label>
  );
}

export default QuizOption;
