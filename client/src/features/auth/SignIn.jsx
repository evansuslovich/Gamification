import React, { useState } from "react"
import { useDispatch } from "react-redux";
import { setCredentials } from "../../app/services/slices/authSlice";
import { useLoginMutation } from "../../app/services/api/authApi";

export default function SignIn() {

  const [account, setAccount] = useState({});
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setAccount(values => ({ ...values, [name]: value }))
  }

  const handleSubmit = async () => {

     try {
      const user = await login(account).unwrap();
      dispatch(setCredentials(user));
      // navigate(from, { replace: true });
      // enqueueSnackbar('You are now signed in', { variant: 'success' });
      // the CSRF token changes because we've launched a new session - save the new one
      // saveCsrfToken();
    } catch (err) {
      console.log(err)
      // enqueueSnackbar('Login failed', { variant: 'error' });
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={account.username || ""}
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