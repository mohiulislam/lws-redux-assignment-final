import React from "react";
import QuizOption from "./QuizOption";

function Quiz() {
  return (
    <div className="quiz">
      <h4 className="question">
        Quiz 1 - What is a Debounce function in JavaScript?
      </h4>
      <form className="quizOptions">
        <QuizOption />
        <QuizOption />
        <QuizOption />
        <QuizOption />
      </form>
    </div>
  );
}

export default Quiz;
