import React from "react";
import QuizOption from "./QuizOption";
function Quiz({ quiz }) {
  const { options } = quiz;

  return (
    <div className="quiz">
      <h4 className="question">{quiz?.question}</h4>
      <form className="quizOptions">
        {quiz &&
          options.map((option) => (
            <QuizOption
              quizId={quiz?.id}
              option={option || {}}
              key={Math.random()}
            />
          ))}
      </form>
    </div>
  );
}

export default Quiz;
