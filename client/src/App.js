import React from "react";

import {
  Route, Routes
} from 'react-router-dom';

import Homepage from "./features/homepage/Homepage"

import SignIn from "./features/auth/SignIn";
import SignUp from "./features/auth/SignUp";
import Account from "./features/auth/Account";

function App() {

  return (
    <div className="app">

      <Routes>
        <Route index element={<Homepage />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </div>
  );
}

export default App;