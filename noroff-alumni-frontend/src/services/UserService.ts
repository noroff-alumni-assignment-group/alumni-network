
import LoginRequest from "../models/LoginRequest";
import tokenService from "./tokenService";
import api from "./api";
import store from "../store/store";
import { removeUser } from "../store/userSlice";

class UserService {

   async login(loginData:LoginRequest) {
      await api.post("/authenticate",loginData).then((response)=>{
         console.log(response.status);
      if(response.status === 200){
         tokenService.setAuth(response.data);
      }
      }).catch((error)=> error);
      
   }

   async logout(){
      tokenService.removeAuth();
      store.dispatch(removeUser({}));
      return await api.post("/authenticate/signout",{token: tokenService.getLocalRefreshToken()});
   }

   async getUser(){
      return await api.get("/user");
   }
}

const service = new UserService();
export default service;