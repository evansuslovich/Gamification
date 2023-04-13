import React, { useState } from "react"
import { useDispatch } from "react-redux";
import { setUser } from "../../app/services/slices/authSlice";
import { useRegisterMutation } from "../../app/services/api/authApi";
import { useSnackbar } from 'notistack'
import { useNavigate } from "react-router-dom";

export default function SignUp() {

  const [register, {isLoading}] = useRegisterMutation();
  const { enqueueSnackbar } = useSnackbar()
  const dispatch = useDispatch();
  const navigate = useNavigate()

  // credentials
  const [formState, setFormState] = React.useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password1: '',
    password2: '',
    reason: '',
  });

  const handleChange = ({ target: { name, value } }) => (
    setFormState((prev) => ({ ...prev, [name]: value }))
  );

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const user = await register(formState).unwrap();
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
        name="firstName"
        placeholder="First Name"
        value={formState.firstName || ""}
        onChange={handleChange}
      />

      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={formState.lastName || ""}
        onChange={handleChange}
      />

      <input
        type="text"
        name="email"
        placeholder="Email"
        value={formState.email || ""}
        onChange={handleChange}
      />

      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formState.username || ""}
        onChange={handleChange}
      />

      <input
        type="text"
        name="password1"
        placeholder="Password"
        value={formState.password1 || ""}
        onChange={handleChange}
      />

      <input
        type="text"
        name="password2"
        placeholder="Retype Password"
        value={formState.password2 || ""}
        onChange={handleChange}
      />

      <input
        type="text"
        name="reason"
        placeholder="Reason"
        value={formState.reason || ""}
        onChange={handleChange}
      />

      <input type="submit" />
    </form>
  )
}


