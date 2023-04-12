// import logo from './logo.svg';
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
// import {BrowserRouter as Router} from 'react-router-dom'

import "./style.css";

function App() {
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  var userdata
  // User Login info
  const database = [
    {
      username: "0000",
      password: "pass1",
      rewardPoints: 10
    },
    {
      username: "0001",
      password: "pass2",
      rewardPoints: 100
    }
  ];

  const errors = {
    uname: "invalid username",
    pass: "invalid password"
  };

  var uname;
  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    var {uname, pass} = document.forms[0];

    // Find user login info
    const userData = database.find((user) => user.username === uname.value);
    // userdata = userData;
    console.log("userdata")
    // Compare user info
    if (userData) {
      if (userData.password !== pass.value) {
        // Invalid password
        setErrorMessages({ name: "pass", message: errors.pass });
      } else {
        setIsSubmitted(true);
      }
    } else {
      // Username not found
      setErrorMessages({ name: "uname", message: errors.uname });
    }
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  // JSX code for login form
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Loyallty Card Number </label>
          <input type="text" name="uname" required />
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required />
          {renderErrorMessage("pass")}
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>
  );
  
  return (
      <div className="app">
        <div className="login-form">
          {isSubmitted ? 
          <Navigate to="/Dashboard" state= {uname}/>
          :renderForm}
        </div>
      </div>
    );
}

export default App;
