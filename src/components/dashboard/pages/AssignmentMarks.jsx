import Error from "components/common/Error";
import Loader from "components/common/Loader";
import NotFound from "components/common/NotFound";
import { useGetAssignmentMarksQuery } from "features/assignmentMark/assignmentMarkApi";
import React, { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import AssignmentMark from "../SubComponents/AssignmentMark";

function AssignmentMarks() {
  const {
    data: assignmentMarks,
    isLoading: assignmentMarksIsLoading,
    isError: assignmentMarksIsError,
    error: assignmentMarksError,
  } = useGetAssignmentMarksQuery();

  let content;

  if (assignmentMarksIsLoading) {
    content = <Loader />;
  }

  if (assignmentMarksIsError && !assignmentMarksIsLoading) {
    content = (
      <Error message={assignmentMarksError?.message || "server error"} />
    );
  }
  if (
    !assignmentMarksIsLoading &&
    !assignmentMarksIsError &&
    assignmentMarks?.length === 0
  ) {
    content = <NotFound desire="assignmentMark" />;
  }

  if (
    !assignmentMarksIsLoading &&
    !assignmentMarksIsError &&
    assignmentMarks?.length > 0
  ) {
    content = assignmentMarks?.map((assignmentMark) => (
      <AssignmentMark assignmentMark={assignmentMark || {}} />
    ));
  }

  const [pending, setPending] = useState();

  const [markSent, setMarkSent] = useState();

  useEffect(() => {
    if (assignmentMarks?.length) {
      console.log(assignmentMarks?.length);

      setPending(
        assignmentMarks.reduce(
          (acc, cur) => (cur?.status === "pending" ? acc + 1 : acc),
          0
        )
      );
    }
  }, [assignmentMarks]);

  return (
    <MainLayout>
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-full px-5 lg:px-20">
          <div className="px-3 py-20 bg-opacity-10">
            <ul className="assignment-status">
              <li>
                Total <span>{assignmentMarks?.length}</span>
              </li>
              <li>
                Pending<span>{pending}</span>
              </li>
              <li>
                Mark Sent <span>{assignmentMarks?.length - pending}</span>
              </li>
            </ul>
            <div className="overflow-x-auto mt-4">
              <table className="divide-y-1 text-base divide-gray-600 w-full">
                <thead>
                  <tr>
                    <th className="table-th">Assignment</th>
                    <th className="table-th">Date</th>
                    <th className="table-th">Student Name</th>
                    <th className="table-th">Repo Link</th>
                    <th className="table-th">Mark</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-600/50">
                  {content}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}

export default AssignmentMarks;
