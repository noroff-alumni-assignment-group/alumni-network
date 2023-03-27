import "./login.css";
import {useDispatch} from "react-redux";
import { setUser } from "../../store/userSlice";
import UserService from "../../services/UserService";
import { useState } from "react";
import { useAlert } from "react-alert";
import LoadingIndicator from "../../components/LoadingIndicator/LoadingIndicator";

export default function LoginForm(props: any) {
  const dispatch = useDispatch();
  const alert = useAlert();
  const [loading,setLoading] = useState(false);

     const signIn = async (event: any) => {
       event.preventDefault();
       setLoading(true);
       const username = event.target.elements.username.value;
       const password = event.target.elements.password.value;
       const loginResponse = await UserService.login({username:username,password:password});
       if(loginResponse.status === 200){
          await UserService.getUser().then((response)=>{
            dispatch(setUser(response.data));
          }).catch((error)=>{
            alert.error("Could not retrieve user data");
          });
 
       }else{
        alert.error("Login failed");
       }
       
       setLoading(false);
     };


  return (
    <div className={`login-form`}>
      {loading ? <LoadingIndicator /> : null}
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
            <span onClick={(event) => props.setAnimateMesh(!props.animateMesh)}>
              {" "}
              Sign up
            </span>
          </p>

          <div className="signin-btn-cnt">
            <button type="submit" className="submit-btn">
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
