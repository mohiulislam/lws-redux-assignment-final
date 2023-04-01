import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CoursePlayer from "./components/student/pages/CoursePlayer";
import Leaderboard from "./components/student/pages/Leaderboard";
import Login from "./components/student/pages/Login";
import Quizzes from "./components/student/pages/Quizzes";
import Registration from "./components/student/pages/Registration";
import PublicRoute from "./routes/PublicRoute";
function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route path="/Quizzes" element={<Quizzes />} />
        <Route path="/CoursePlayer" element={<CoursePlayer />} />
        <Route path="/Leaderboard" element={<Leaderboard />} />
        <Route path="/Registration" element={<Registration />} />
      </Routes>
    </Router>
  );
}

export default App;
