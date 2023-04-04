import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CoursePlayer from "components/student/pages/CoursePlayer";
import Leaderboard from "components/student/pages/Leaderboard";
import Login from "components/common/Login";
import Quizzes from "components/student/pages/Quizzes";
import AdminQuizzes from "components/dashboard/pages/Quizzes";
import Registration from "components/student/pages/Registration";
import AssignmentMarks from "components/dashboard/pages/AssignmentMarks";
import Dashboard from "components/dashboard/pages/Dashboard";
import Videos from "components/dashboard/pages/Videos";
import Assignments from "components/dashboard/pages/Assignments";
import useAuthCheck from "hooks/useAuthCheck";
import AuthLoader from "components/common/AuthLoader";
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
