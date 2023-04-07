import React from "react";
import QuizOption from "./QuizOption";
function Quiz({ quiz }) {
  const { options } = quiz;

  return (
    <div className="quiz">
      <h4 className="question">{quiz?.question}</h4>
      <div className="quizOptions">
        {quiz &&
          options.map((option) => (
            <QuizOption
              quizId={quiz?.id}
              option={option || {}}
              key={Math.random()}
            />
          ))}
      </div>
    </div>
  );
}

export default Quiz;
