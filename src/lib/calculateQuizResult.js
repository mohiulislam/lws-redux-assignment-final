function calculateQuizResult(quizData, selectedResult) {
  let totalCorrect = 0;
  let totalWrong = 0;
  let totalMark = 0;

  for (let i = 0; i < quizData.length; i++) {
    const question = quizData[i];
    const selectedOptions = selectedResult.filter((option) =>
      option.id.includes(`q${question.id}`)
    );
    let isCorrect = true;

    for (let j = 0; j < question.options.length; j++) {
      const option = question.options[j];

      const selectedOption = selectedOptions.find(
        (selected) => selected.id === `option${option.id}_q${question.id}`
      );

      if (
        (selectedOption && !option.isCorrect) ||
        (!selectedOption && option.isCorrect)
      ) {
        isCorrect = false;
        break;
      }
    }

    if (isCorrect) {
      totalCorrect++;
      totalMark += 5;
    } else {
      totalWrong++;
    }
  }

  return { totalCorrect, totalWrong, totalMark };
}

export default calculateQuizResult;
