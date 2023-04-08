import {
  useGetAssignmentMarkQuery,
  useGetAssignmentMarksQuery,
} from "features/assignmentMark/assignmentMarkApi";
import React from "react";
import MainLayout from "../../layouts/MainLayout";
import ParticipantResult from "../SubComponents/ParticipantResult";
import WonResult from "../SubComponents/WonResult";

function Leaderboard() {


  return (
    <MainLayout>
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-7xl px-5 lg:px-0">
          <div>
            <h3 className="text-lg font-bold">Your Position in Leaderboard</h3>
            <WonResult />
          </div>

          <div className="my-8">
            <h3 className="text-lg font-bold">Top 20 Result</h3>
            <table className="text-base w-full border border-slate-600/50 rounded-md my-4">
              <thead>
                <tr className="border-b border-slate-600/50">
                  <th className="table-th !text-center">Rank</th>
                  <th className="table-th !text-center">Name</th>
                  <th className="table-th !text-center">Quiz Mark</th>
                  <th className="table-th !text-center">Assignment Mark</th>
                  <th className="table-th !text-center">Total</th>
                </tr>
              </thead>
              <tbody>
                <ParticipantResult />
                <ParticipantResult />
                <ParticipantResult />
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}

export default Leaderboard;
