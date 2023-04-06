import React from "react";
import Quiz from "react-quiz-component";

function Test() {
  const quiz = [
    {
      question: "What is a Debounce function in JavaScript?",
      options: [
        {
          option: "A function that is called after a certain time interval",
          isCorrect: true,
        },
        {
          option: "A function that is called after a certain time interval",
          isCorrect: false,
        },
        {
          option: "A function that is called after a certain time interval",
          isCorrect: false,
        },
        {
          option: "A function that is called after a certain time interval",
          isCorrect: false,
        },
      ],
    },
    {
      question:
        "Which of the following is an example of a situation where you would use the Debounce function?",
      options: [
        {
          option: "A search bar where the results are displayed as you type.",
          isCorrect: true,
        },
        {
          option: "A button that performs an action when clicked.",
          isCorrect: false,
        },
        {
          option: "An animation that plays when a user hovers over an element.",
          isCorrect: false,
        },
        {
          option: "All of the above.",
          isCorrect: false,
        },
      ],
    },
  ];

  return (
    <div>
      <Quiz quiz={quiz} />
    </div>
  );
}

export default Test;
