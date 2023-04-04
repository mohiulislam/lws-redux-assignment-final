import React from "react";

//option1_q1

function QuizOption({ option:
{id,option} }) {
  console.log(option);
  
  return (
    <label htmlFor="option1_q1">
      <input type="checkbox" id="option1_q1" />
      {option}
    </label>
  );
}

export default QuizOption;
