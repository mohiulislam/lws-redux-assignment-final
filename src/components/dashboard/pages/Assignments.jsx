import Error from "components/common/Error";
import Loader from "components/common/Loader";
import NotFound from "components/common/NotFound";
import { useGetAssignmentsQuery } from "features/assignment/assignmentApi";
import React, { useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import AddOrEditAssignmentModal from "../SubComponents/AddOrEditAssignmentModal";
import Assignment from "../SubComponents/Assignment";

function Assignments() {
  const {
    data: assignments,
    isLoading: assignmentsIsLoading,
    isError: assignmentsIsError,
    error: assignmentsError,
  } = useGetAssignmentsQuery();

  const [assignmentIdToEdit, setAssignmentIdToEdit] = useState(null);

  let content;
  if (assignmentsIsLoading) {
    content = <Loader />;
  }
  if (!assignmentsIsLoading && assignmentsError) {
    content = <Error message={assignmentsError} />;
  }
  if (
    !assignmentsIsLoading &&
    !assignmentsIsError &&
    assignments.length === 0
  ) {
    <NotFound desire={"assignment"} />;
  }
  const [isModalOpen, setModalOpen] = useState(false);
  if (!assignmentsIsLoading && !assignmentsIsError && assignments.length > 0) {
    content = assignments.map((assignment) => (
      <Assignment
        setAssignmentIdToEdit={setAssignmentIdToEdit}
        setModalOpen={setModalOpen}
        key={assignment?.id}
        assignment={assignment || {}}
      />
    ));
  }
  return (
    <MainLayout>
      <section className="py-6 bg-primary">
        <i className="block text-center text-yellow-300 font-HindSiliguri">
          অ্যাসাইনমেন্ট অ্যাড বা এডিট করার সময় ওপেন হাওয়া মডিউলে
          <span className="text-cyan-400">“ভিডিও সিলেক্ট করুন”</span> লিস্টে
          সবগুলো ভিডিও নাও দেখাতে পারে। কারণ যে ভিডিওর জন্য অ্যাসাইনমেন্ট তৈরি
          করা আছে সেই ভিডিও লিস্টে থাকা উচিত না।
        </i>
        <div className="mx-auto max-w-full px-5 lg:px-20">
          <div className="px-3 py-20 bg-opacity-10">
            <div className="w-full flex">
              <button
                onClick={() => setModalOpen(true)}
                className="btn ml-auto"
              >
                Add Assignment
              </button>
            </div>
            {isModalOpen && (
              <AddOrEditAssignmentModal
                setAssignmentIdToEdit={setAssignmentIdToEdit}
                assignmentIdToEdit={assignmentIdToEdit}
                setModalOpen={setModalOpen}
              />
            )}
            <div className="overflow-x-auto mt-4">
              <table className="divide-y-1 text-base divide-gray-600 w-full">
                <thead>
                  <tr>
                    <th className="table-th">Title</th>
                    <th className="table-th">Video Title</th>
                    <th className="table-th">Mark</th>
                    <th className="table-th">Action</th>
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

export default Assignments;
