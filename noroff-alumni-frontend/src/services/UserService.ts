import axios from "axios";
import LoginRequest from "../models/LoginRequest";

export default class UserService {

   constructor(){
   }

   static async login(loginData:LoginRequest) {
      
      const response = await axios({
         method:"post",
         url: process.env.REACT_APP_API_URL + "authenticate",
         data: loginData
      });


      return response;
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

   static async getUser(authToken:string){
      return await axios({
         method:"get",
         headers:{
            "Authorization":"Bearer "+authToken
         },
         url: process.env.REACT_APP_API_URL + "user",
      });
   }
}