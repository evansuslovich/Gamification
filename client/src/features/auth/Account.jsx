import { useSelector } from "react-redux"
import { selectCurrentUser } from "../../app/services/slices/authSlice"

export default function Account() {

  const user = useSelector(selectCurrentUser) 

  return (
    <div>
      <h1>Account</h1>
      <h1>First Name: {user.firstName}</h1>
      <h1>Last Name: {user.lastName}</h1>
      <h1>Email: {user.email}</h1>
      <h1>username: {user.username}</h1>
    </div>
   
  )
}