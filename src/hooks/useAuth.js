import { useSelector } from "react-redux";
import { selectAuth } from "../features/auth/authSelector";

export default function useAuth() {
  const auth = useSelector(selectAuth);

  if (auth?.accessToken && auth?.user) {
    return { accessToken: auth?.accessToken, user: auth?.user };
  } else {
    return false;
  }
}
