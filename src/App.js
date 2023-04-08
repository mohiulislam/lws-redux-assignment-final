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
import useAuth from "hooks/useAuth";
import getRouteComponent from "lib/getRouteComponent";
import { Navigate } from "react-router-dom";
function App() {
  const auth = useAuth();
  const isAuthentic = useAuthCheck();
  return !isAuthentic ? (
    <AuthLoader />
  ) : (
    <Router>
      <Routes>
        <Route
          path="/"
          element={getRouteComponent(
            auth?.user?.role,
            ["student"],
            <Navigate to={"/CoursePlayer"} />,
            <Login role="Student" />
          )}
        />

        <Route path="/Registration" element={<Registration />} />

        <Route
          path="/Quizzes/:videoId"
          element={getRouteComponent(
            auth?.user?.role,
            ["student"],
            <Quizzes />,
            <Navigate to="/" />
          )}
        />
        <Route
          path="/CoursePlayer/"
          element={getRouteComponent(
            auth?.user?.role,
            ["student"],
            <CoursePlayer />,
            <Navigate to="/" />
          )}
        />
        <Route
          path="/Leaderboard"
          element={getRouteComponent(
            auth?.user?.role,
            ["student"],
            <Leaderboard />,
            <Navigate to="/" />
          )}
        />

        <Route
          path="/Admin/Login"
          element={getRouteComponent(
            auth?.user?.role,
            ["admin"],
            <Navigate to={"/Admin/Dashboard"} />,
            <Login role="Admin" />
          )}
        />

        <Route
          path="/Admin/Assignments"
          element={getRouteComponent(
            auth?.user?.role,
            ["admin"],
            <Assignments />,
            <Navigate path="/Admin/Login" />
          )}
        />
        <Route
          path="/Admin/AssignmentMarks"
          element={getRouteComponent(
            auth?.user?.role,
            ["admin"],
            <AssignmentMarks />,
            <Navigate to="/Admin/Login" />
          )}
        />
        <Route
          path="/Admin/Dashboard"
          element={getRouteComponent(
            auth?.user?.role,
            ["admin"],
            <Dashboard />,
            <Navigate to="/Admin/Login" />
          )}
        />
        <Route
          path="/Admin/Quizzes"
          element={getRouteComponent(
            auth?.user?.role,
            ["admin"],
            <AdminQuizzes />,
            <Navigate to="/Admin/Login" />
          )}
        />
        <Route
          path="/Admin/Videos"
          element={getRouteComponent(
            auth?.user?.role,
            ["admin"],
            <Videos />,
            <Navigate to="/Admin/Login" />
          )}
        />
      </Routes>
    </Router>
  );
}

export default App;
