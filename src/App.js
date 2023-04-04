import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthLoader from "components/common/AuthLoader";
import AssignmentMarks from "components/dashboard/pages/AssignmentMarks";
import Assignments from "components/dashboard/pages/Assignments";
import Dashboard from "components/dashboard/pages/Dashboard";
import Quizzes from "components/student/pages/Quizzes";
import CoursePlayer from "components/student/pages/CoursePlayer";
import Leaderboard from "components/student/pages/Leaderboard";
import Registration from "components/student/pages/Registration";
import useAuthCheck from "hooks/useAuthCheck";
import React from "react";
import AdminQuizzes from "components/dashboard/pages/Quizzes";
import Videos from "components/dashboard/pages/Videos";
import Login from "components/common/Login";
function App() {
  const isAuthentic = useAuthCheck();
  return !isAuthentic ? (
    <AuthLoader />
  ) : (
    <Router>
      <Routes>
        <Route path="/" element={<Login role="Student" />} />

        <Route path="/Quizzes/:videoId" element={<Quizzes />} />
        <Route path="/CoursePlayer/" element={<CoursePlayer />} />
        <Route path="/Leaderboard" element={<Leaderboard />} />
        <Route path="/Registration" element={<Registration />} />

        <Route path="/Admin/Login" element={<Login role="Admin" />} />

        <Route path="/Admin/Assignments" element={<Assignments />} />
        <Route path="/Admin/AssignmentMarks" element={<AssignmentMarks />} />
        <Route path="/Admin/Dashboard" element={<Dashboard />} />
        <Route path="/Admin/Quizzes" element={<AdminQuizzes />} />
        <Route path="/Admin/Videos" element={<Videos />} />
      </Routes>
    </Router>
  );
}

export default App;
