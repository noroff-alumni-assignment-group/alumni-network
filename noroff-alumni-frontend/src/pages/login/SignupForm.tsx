import "./login.css";
import SignupRequest from "../../models/SignupRequest";
import UserService from "../../services/UserService";
import { useState } from "react";
import LoadingIndicator from "../../components/LoadingIndicator/LoadingIndicator";
import { useAlert } from "react-alert";

export default function SignupForm(props: any) {
  const [loading, setLoading] = useState(false);
  const alert = useAlert();

  function registrationRequestIsValid(registrationRequest: SignupRequest) {
    const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (
      !registrationRequest.email ||
      !emailPattern.test(registrationRequest.email)
    ) {
      alert.error("Email is wrong or missing");
      return false;
    } else if (!registrationRequest.firstName) {
      alert.error("First name missing");
      return false;
    } else if (!registrationRequest.lastName) {
      alert.error("Last name missing");
      return false;
    } else if (!registrationRequest.username) {
      alert.error("Username missing");
      return false;
    } else if (!registrationRequest.password) {
      alert.error("Password missing");
      return false;
    }
    return true;
  }

  const signUp = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    const registrationRequest: SignupRequest = {
      username: event.target.elements.username.value,
      email: event.target.elements.email.value,
      firstName: event.target.elements.firstName.value,
      lastName: event.target.elements.lastName.value,
      password: event.target.elements.password.value,
    };
    if (registrationRequestIsValid(registrationRequest)) {
      await UserService.registerUser(registrationRequest)
        .then((response) => {
          if (response.status === 200 || response.status === 201) {
            props.setAnimateMesh(!props.animateMesh);
            alert.success(
              "Congratulations! You are now registered as " +
                registrationRequest.username
            );
            event.target.elements.username.value = "";
            event.target.elements.email.value = "";
            event.target.elements.firstName.value = "";
            event.target.elements.lastName.value = "";
            event.target.elements.password.value = "";
          }
        })
        .catch((error) => {
          if (error.response.status === 409) {
            alert.error("Registration failed, username/email already in use");
          } else {
            alert.error("Registration failed");
          }
        });
    }

    setLoading(false);
  };
  return (
    <div className={`signup-form`}>
      <div className="form-cnt">
        {loading ? <LoadingIndicator /> : null}
        <h1>Sign up</h1>
        <form onSubmit={signUp}>
          <div className="username-cnt">
            <p>Username</p>
            <input type="text" name="username" />
          </div>
          <div className="password-cnt">
            <p>Email</p>
            <input type="text" name="email" />
          </div>
          <div className="password-cnt">
            <p>First Name</p>
            <input type="text" name="firstName" />
          </div>
          <div className="password-cnt">
            <p>Last Name</p>
            <input type="text" name="lastName" />
          </div>
          <div className="password-cnt">
            <p>Password</p>
            <input type="password" name="password" />
          </div>
          <p className="signup-tag">
            Already have an account?
            <span onClick={(event) => props.setAnimateMesh(!props.animateMesh)}>
              {" "}
              Sign in
            </span>
          </p>
          <div className="signin-btn-cnt">
            <button type="submit" className="submit-btn">
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
