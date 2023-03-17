import "./login.css";
import {useDispatch} from "react-redux";
import Auth from "../../models/Auth";
import { setUser } from "../../store/userSlice";
import UserService from "../../services/UserService";

export default function LoginForm(props: any) {
  const dispatch = useDispatch();

     const signIn = async (event: any) => {
       event.preventDefault();
       props.setAnimateMesh(true);

       const username = event.target.elements.username.value;
       const password = event.target.elements.password.value;
       await UserService.login({username:username,password:password});

       dispatch(setUser((await UserService.getUser()).data));
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
          <input type="submit" className="submit-btn" />
          <p className="signup-tag">
            Dont have an account?
            <span onClick={(event) => signIn(event)}> Sign up</span>
          </p>
        </form>
      </div>
    </div>
  );
}
