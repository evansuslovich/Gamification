import React, { useEffect, useState } from "react"

import { useGetAllUsersQuery } from "../../app/services/api/authApi";

export default function SignIn() {

  const [account, setAccount] = useState({});

  const users = useGetAllUsersQuery();
  const [user, setUsers] = useState(users)


  useEffect(() => {

    // declare the data fetching function
    const fetchData = async () => {
      const data = await users;
    }

    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, [])


  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setAccount(values => ({ ...values, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(users)

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