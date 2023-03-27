
import LoginRequest from "../models/LoginRequest";
import tokenService from "./tokenService";
import api from "./api";
import store from "../store/store";
import { removeUser } from "../store/userSlice";
import SignupRequest from "../models/SignupRequest";
import axios from "axios";

class UserService {

   async login(loginData:LoginRequest) {
      return await api
        .post("/authenticate", loginData)
        .then((response) => {
          if (response.status === 200) {
            tokenService.setAuth(response.data);
          }
          return response;
        })
        .catch((error) => error);
      
   }

   async logout(){
      tokenService.removeAuth();
      store.dispatch(removeUser({}));
      return await api.post(
          "/authenticate/signout",
        { token: tokenService.getLocalRefreshToken() }
      );
   }

   async getUser(){
      return await api.get("/user");
   }

   async getUsers(searchWord: string){
      return await api.get("/user/search", {
               params: {
                  search: searchWord
               }
            })
          .then(response =>  response.data);
   }

   async registerUser(signupRequest:SignupRequest){
      return await api.post(
          "/authenticate/register",
        signupRequest
      );
   }
}

const service = new UserService();
export default service;