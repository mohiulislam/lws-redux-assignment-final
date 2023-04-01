import { Navigate } from "react-router-dom";
// import useAuth from "../hooks/useAuth";

export default function PublicRoute({ children }) {
//   const isLoggedIn = useAuth();

  return !0 ? children : <Navigate to="/inbox" />;
}
