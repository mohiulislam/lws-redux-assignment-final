import { useSubmitAssignmentMarkMutation } from "features/assignmentMark/assignmentMarkApi";
import React, { Fragment, useEffect, useState } from "react";

function AssignmentMark({
  assignmentMark: { id, title, createdAt, student_name, repo_link, mark },
}) {
  const [submitAssignmentMark, { isLoading, isError, error }] =
    useSubmitAssignmentMarkMutation();

  const [formattedDate, setFormattedDate] = useState();
  const [inputMark, setInputMark] = useState();

  useEffect(() => {
    const date = new Date(createdAt);
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    };
    const formattedDate = date.toLocaleString("en-US", options);
    setFormattedDate(formattedDate);
  }, [createdAt]);

  function handleMarking() {
    if (!inputMark) {
      alert("Give mark first");
      return;
    }
    submitAssignmentMark({
      id,
      data: {
        mark: inputMark,
        status: "published",
      },
    });
  }

  return (
    <tr>
      <td className="table-td">{title}</td>
      <td className="table-td">{formattedDate}</td>

      <td className="table-td">{student_name}</td>
      <td className="table-td">{repo_link}</td>
      <td className={`table-td ${!mark ? "input-mark" : ""}`}>
        {mark || (
          <Fragment>
            <input
              onChange={(e) => setInputMark(parseFloat(e.target.value))}
              max="100"
              value={inputMark}
              type="number"
            />
            <svg
              onClick={handleMarking}
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6 text-green-500 cursor-pointer hover:text-green-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </Fragment>
        )}
      </td>
    </tr>
  );
}

export default AssignmentMark;
