import { useEffect, useState } from "react";
const {
  useGetAssignmentMarksQuery,
} = require("features/assignmentMark/assignmentMarkApi");
const { useGetQuizMarksQuery } = require("features/quizMark/quizMarkApi");
const { useGetUserQuery } = require("features/user/userApi");

export default function useResult() {
  const { data: users } = useGetUserQuery();

  const { data: assignmentMarks } = useGetAssignmentMarksQuery();

  const { data: quizMarks } = useGetQuizMarksQuery();

  const [result, setResult] = useState();

  useEffect(() => {
    const studentMarks = [];
    if (users && assignmentMarks && quizMarks) {
      const students = users?.filter((user) => user.role === "student");
      for (const student of students) {
        const quizMark = quizMarks.filter(
          (mark) => mark.student_id === student.id
        );

        const assignmentMark = assignmentMarks.filter(
          (mark) => mark.student_id === student.id
        );

        const totalQuizMark = quizMark.reduce(
          (acc, mark) => acc + mark.totalMark,
          0
        );

        const totalAssignmentMark = assignmentMark.reduce(
          (acc, mark) => acc + mark.mark,
          0
        );

        studentMarks.push({
          id: student.id,
          name: student.name,
          quizMark: totalQuizMark,
          assignmentMark: totalAssignmentMark,
        });
      }
    }
    setResult(studentMarks);
  }, [quizMarks, assignmentMarks, users]);

  return result;
}
