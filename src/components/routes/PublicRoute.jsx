// import { useNavigate } from "react-router-dom";
// // import useAuth from "../hooks/useAuth";

// export default function PublicRoute({ children }) {
//   const navigate = useNavigate();
//   const role = "admin";
//   const isLoggedIn = 0;

//   if (!isLoggedIn && role === "student") {
//     return children;
//   } else {
//     navigate("/CoursePlayer");
//   }
//   if (!isLoggedIn && role === "admin") {
//     return children;
//   } else {
//     navigate("/Admin/Dashboard");
//   }
// }
