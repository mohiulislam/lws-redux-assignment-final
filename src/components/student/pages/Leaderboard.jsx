import React from "react";
import MainLayout from "../../layouts/MainLayout";
import ParticipantResult from "../SubComponents/ParticipantResult";
import WonResult from "../SubComponents/WonResult";

function Leaderboard() {
  return (
    <MainLayout>
      <section class="py-6 bg-primary">
        <div class="mx-auto max-w-7xl px-5 lg:px-0">
          <div>
            <h3 class="text-lg font-bold">Your Position in Leaderboard</h3>
            <WonResult />
          </div>

          <div class="my-8">
            <h3 class="text-lg font-bold">Top 20 Result</h3>
            <table class="text-base w-full border border-slate-600/50 rounded-md my-4">
              <thead>
                <tr class="border-b border-slate-600/50">
                  <th class="table-th !text-center">Rank</th>
                  <th class="table-th !text-center">Name</th>
                  <th class="table-th !text-center">Quiz Mark</th>
                  <th class="table-th !text-center">Assignment Mark</th>
                  <th class="table-th !text-center">Total</th>
                </tr>
              </thead>

              <tbody>
                <ParticipantResult />
                <ParticipantResult />
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
