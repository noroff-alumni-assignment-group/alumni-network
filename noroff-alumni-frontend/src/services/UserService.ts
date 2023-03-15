import axios from "axios";
import Auth from "../models/Auth";
import LoginRequest from "../models/LoginRequest";

export default class UserService {

   constructor(){}

   static async login(loginData:LoginRequest) {
      return await axios({
         method:"post",
         url: process.env.REACT_APP_API_URL + "authenticate",
         data: loginData
      });
   }

   static async logout(refreshToken:string){
      return await axios({
         method:"post",
         url: process.env.REACT_APP_API_URL + "authenticate/signout",
         data: {
            token: refreshToken
         }
      });
   }
}