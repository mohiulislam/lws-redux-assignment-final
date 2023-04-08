import { selectAuth } from "features/auth/authSelector";
import useAuth from "hooks/useAuth";
import useResult from "hooks/useResult";
import React, { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import ParticipantResult from "../SubComponents/ParticipantResult";
import WonResult from "../SubComponents/WonResult";

function Leaderboard() {
  const auth = useAuth(selectAuth);

  const studentResult = useResult();

  const [results, setResult] = useState();

  const [wonResult, setWonResult] = useState();

  useEffect(() => {
    setWonResult(results?.find((student) => student.id === auth?.user?.id));
  }, [results]);

  useEffect(() => {
    if (studentResult) {
      const resultsForLeaderBoard = studentResult.map((student) => {
        const totalMark = student.quizMark + student.assignmentMark;
        return {
          id: student.id,
          name: student.name,
          quizMark: student.quizMark,
          assignmentMark: student.assignmentMark,
          totalMark: totalMark,
          ranking: 0,
        };
      });

      resultsForLeaderBoard.sort((a, b) => b.totalMark - a.totalMark);

      let currentRank = 1;
      let currentTotalMark = resultsForLeaderBoard[0]?.totalMark;

      resultsForLeaderBoard.forEach((student, index) => {
        if (student.totalMark < currentTotalMark) {
          currentRank++;
          currentTotalMark = student.totalMark;
        }
        student.ranking = currentRank;
      });
      setResult(resultsForLeaderBoard?.slice(0, 20));
    }
  }, [studentResult]);

  return (
    <MainLayout>
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-7xl px-5 lg:px-0">
          <div>
            <h3 className="text-lg font-bold">Your Position in Leaderboard</h3>
            <WonResult result={wonResult || {}} />
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
                {results?.map((result) => (
                  <ParticipantResult result={result || {}} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}

export default Leaderboard;
