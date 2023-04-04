import React from "react";
import QuizOption from "./QuizOption";
function Quiz({ quiz }) {
  const {options}=quiz
console.log(quiz);

  return (
    <div className="quiz">
      <h4 className="question">
        Quiz 1 - What is a Debounce function in JavaScript?
      </h4>
      <form className="quizOptions">
        {quiz &&
         options.map((option) => (
            <QuizOption option={option||{}} key={Math.random()} />
          ))}
      </form>
    </div>
  );
}

export default Quiz;
