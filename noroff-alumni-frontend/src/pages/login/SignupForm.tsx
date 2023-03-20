import React, { useState } from "react";
import "./login.css";
import axios from "axios";

export default function SignupForm(props: any) {
  const signUp = (event: any) => {
    event.preventDefault();
    

    const username = event.target.elements.username.value;
    const password = event.target.elements.password.value;
    const confirmPassword = event.target.elements.confirmPassword.value;

    axios
      .post("https://your-api-url.com/login", {
        username,
        password,
        confirmPassword,
      })
      .then((response) => {
        // Handle the response from the API here
        console.log(response.data);
      })
      .catch((error) => {
        // Handle any errors that occur during the API request here
        console.error(error);
      });
  };
  return (
    <div className={`signup-form`}>
      <div className="form-cnt">
        <h1>Sign up</h1>
        <form onSubmit={signUp}>
          <div className="username-cnt">
            <p>Username</p>
            <input type="text" name="username" />
          </div>
          <div className="password-cnt">
            <p>Password</p>
            <input type="password" name="password" />
          </div>
          <div className="password-cnt">
            <p>Confirm Password</p>
            <input type="password" name="confirmPassword" />
          </div>
          <input type="submit" className="submit-btn" />
          <p className="signup-tag">
            Already have an account?
            <span onClick={(event) => props.setAnimateMesh(!props.animateMesh)}> Sign in</span>
          </p>
        </form>
      </div>
    </div>
  );
}
