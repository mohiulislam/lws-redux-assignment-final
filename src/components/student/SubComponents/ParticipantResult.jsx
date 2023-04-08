import React from "react";
function ParticipantResult({
  result: { name, quizMark, ranking, totalMark, assignmentMark },
}) {
  return (
    <tr className="border-b border-slate-600/50">
      <td className="table-td text-center">{ranking}</td>
      <td className="table-td text-center">{name}</td>
      <td className="table-td text-center">{quizMark}</td>
      <td className="table-td text-center">{assignmentMark}</td>
      <td className="table-td text-center">{totalMark}</td>
    </tr>
  );
}

export default ParticipantResult;
