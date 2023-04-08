import React from "react";

function WonResult({
  result: { name, quizMark, assignmentMark, totalMark, ranking },
}) {
  return (
    <table className="text-base w-full border border-slate-600/50 rounded-md my-4">
      <thead>
        <tr>
          <th className="table-th !text-center">Rank</th>
          <th className="table-th !text-center">Name</th>
          <th className="table-th !text-center">Quiz Mark</th>
          <th className="table-th !text-center">Assignment Mark</th>
          <th className="table-th !text-center">Total</th>
        </tr>
      </thead>

      <tbody>
        <tr className="border-2 border-cyan">
          <td className="table-td text-center font-bold">{ranking}</td>
          <td className="table-td text-center font-bold">{name}</td>
          <td className="table-td text-center font-bold">{quizMark}</td>
          <td className="table-td text-center font-bold">{assignmentMark}</td>
          <td className="table-td text-center font-bold">{totalMark}</td>
        </tr>
      </tbody>
    </table>
  );
}

export default WonResult;
