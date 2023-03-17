
import LoginRequest from "../models/LoginRequest";
import tokenService from "./tokenService";
import api from "./api";

class UserService {

   async login(loginData:LoginRequest) {
      const response = await api.post("/authenticate",loginData);
      tokenService.setAuth(response.data);
   }

   async logout(refreshToken:string){
      tokenService.removeAuth();
      return await api.post("/authenticate/signout",{token: refreshToken});
   }

   async getUser(){
      return await api.get("/user");
   }
}

const service = new UserService();
export default service;