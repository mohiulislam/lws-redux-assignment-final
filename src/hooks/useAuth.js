import { selectAuth } from "features/auth/authSelector";
import { useSelector } from "react-redux";


export default function useAuth() {
  const auth = useSelector(selectAuth);

  if (auth?.accessToken && auth?.user) {
    return { accessToken: auth?.accessToken, user: auth?.user };
  } else {
    return false;
  }
}
