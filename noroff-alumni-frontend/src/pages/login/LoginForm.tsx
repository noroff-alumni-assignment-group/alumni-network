import React, { useState } from "react";
import "./login.css";
import axios from "axios";

export default function LoginForm(props: any) {

     const signIn = (event: any) => {
       event.preventDefault();
       props.setAnimateMesh(true);

       const username = event.target.elements.username.value;
       const password = event.target.elements.password.value;

       axios
         .post("https://your-api-url.com/login", { username, password })
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
    <div className={`login-form ${props.animateMesh ? "animate" : ""}`}>
      <div className="form-cnt">
        <h1>Sign in</h1>
        <form onSubmit={signIn}>
          <div className="username-cnt">
            <p>Username</p>
            <input type="text" name="username" />
          </div>
          <div className="password-cnt">
            <p>Password</p>
            <input type="password" name="password" />
          </div>
          <p className="signup-tag">
            Dont have an account?
            <span onClick={(event) => signIn(event)}> Sign up</span>
          </p>
        </form>
      </div>
    </div>
  );
}
