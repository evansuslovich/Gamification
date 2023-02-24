

import { Link } from "react-router-dom"

export default function Header() {


  return (

    <>

      <Link to="/sign-in"> Sign In </Link>
      <br />

      <Link to="/sign-up"> Sign Up </Link>
      <br />

      <Link to="/account"> Account </Link>
      <br />

    </>

  )
}