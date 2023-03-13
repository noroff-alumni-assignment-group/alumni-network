import React, { useState } from "react";
import MeshGradient from "../../assets/pictures/mesh-gradient.png";
import "./login.css";
import axios from "axios";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

function Login() {
  const [animateMesh, setAnimateMesh] = useState(false);

  

  return (
    <div className="login-page">
      <LoginForm setAnimateMesh={setAnimateMesh} animateMesh={animateMesh} />
      <SignupForm setAnimateMesh={setAnimateMesh} animateMesh={animateMesh} />

      <div className={`login-mesh-gradient ${animateMesh ? "animate" : ""}`}>
        <img src={MeshGradient} alt="" className="gradient-img" />
      </div>
    </div>
  );
}

export default Login;
