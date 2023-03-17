import React, { useState } from "react";
import MeshGradient from "../../assets/pictures/mesh-gradient.png";
import "./login.css";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

function Login() {
  const [animateMesh, setAnimateMesh] = useState(false);

  

  return (
    <div className="login-page">
      <div className="login-page-forms">
      <LoginForm setAnimateMesh={setAnimateMesh} animateMesh={animateMesh} />
      <SignupForm setAnimateMesh={setAnimateMesh} animateMesh={animateMesh} />
      </div>

      <div className={`login-mesh-gradient ${animateMesh ? "animate" : ""}`}>
        <img src={MeshGradient} alt="" className="gradient-img" />
      </div> 
    </div>
  );
}

export default Login;
