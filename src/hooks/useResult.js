// const {
//   default: Assignment,
// } = require("components/dashboard/SubComponents/Assignment");
// const {
//   useGetAssignmentMarksQuery,
// } = require("features/assignmentMark/assignmentMarkApi");
// const { useGetQuizMarksQuery } = require("features/quizMark/quizMarkApi");
// const { useGetUserQuery } = require("features/user/userApi");

// function useResult() {
//   const {
//     data: users,
//     isError: usersIsError,
//     isLoading: usersIsLoading,
//     error: usersError,
//   } = useGetUserQuery();

//   const {
//     data: assignmentMarkMarks,
//     isError: assignmentMarkIsError,
//     isLoading: assignmentIsLoading,
//     error: assignmentError,
//   } = useGetAssignmentMarksQuery();

//   const {
//     data: quizMarks,
//     isError: quizMarkIsError,
//     isLoading: quizMarkIsLoading,
//     error: quizMarkError,
//   } = useGetQuizMarksQuery();

//   users?.map((user) => {
//     assignmentMarkMarks?.find((assignmentMark) => {
//       if (assignmentMark?.student_id === user?.id) {
//         return ({assignmentMark?.mark})
        
//       }
//     });
//   });
// }
