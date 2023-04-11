import React, { useState } from "react"
import { useDispatch } from "react-redux";
import { setUser } from "../../app/services/slices/authSlice";
import { useLoginMutation } from "../../app/services/api/authApi";
import { useSnackbar } from 'notistack'
import { useNavigate } from "react-router-dom";

export default function SignIn() {

  const [account, setAccount] = useState({});
  const [login] = useLoginMutation();
  const { enqueueSnackbar } = useSnackbar()
  const dispatch = useDispatch();
  const navigate = useNavigate()


  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setAccount(values => ({ ...values, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      
      const user = await login(account).unwrap();
      dispatch(setUser(user));
      localStorage.setItem('token', user.token)
      navigate("/")
      enqueueSnackbar('You are now signed in', { variant: 'success' });

    } catch (err) {
      console.log(err)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="email"
        placeholder="Email"
        value={account.email || ""}
        onChange={handleChange}
      />
      <input
        type="text"
        name="password"
        placeholder="Password"
        value={account.password || ""}
        onChange={handleChange}
      />

      <input type="submit" />
    </form>
  )
}