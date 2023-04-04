import React from "react";
import QuizOption from "./QuizOption";
import { v4 as uuidv4 } from "uuid";
function Quiz() {
  const id = uuidv4();
  return (
    <div className="quiz">
      <h4 className="question">
        Quiz 1 - What is a Debounce function in JavaScript?
      </h4>
      <form className="quizOptions">
        <QuizOption key={id} />
        <QuizOption key={id} />
        <QuizOption key={id} />
        <QuizOption key={id} />
      </form>
    </div>
  );
}

export default Quiz;
