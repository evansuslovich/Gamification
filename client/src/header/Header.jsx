import { Link } from "react-router-dom"
import { selectIsLoggedIn } from "../app/services/slices/authSlice"
import { useSelector } from "react-redux";

export default function Header() {

  const auth = useSelector(selectIsLoggedIn);

  return (
    <div>
      {auth &&
        <Link to="/account"> Account </Link>
      }

      {!auth &&
        <div>
          <Link to="/sign-in"> Sign In </Link>
          <Link to="/sign-up"> Sign Up </Link>
        </div>
      }
    </div>
  )
}