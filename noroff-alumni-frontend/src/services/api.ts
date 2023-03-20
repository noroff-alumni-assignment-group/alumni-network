import axios from "axios";
import tokenService from "./tokenService";
import store from "../store/store";
import { removeUser } from "../store/userSlice";

const instance = axios.create({
   baseURL: process.env.REACT_APP_API_URL,

});

instance.interceptors.request.use(
   (config)=>{
      const token = tokenService.getLocalAccessToken();
      if(token){
         config.headers["Authorization"] = "Bearer " + token;
      }
      return config;
   },
   (error)=>Promise.reject(error)
);

instance.interceptors.response.use(
   (res)=>{
      return res
   },
   async (err)=>{
      console.log(err.config);
      const originalConfig = err.config;

      if((originalConfig.url !== "/authenticate" && originalConfig.url !== "/authenticate/refresh") && err.response){
         if(err.response.status === 401 && !originalConfig._retry){
            originalConfig._retry = true;

            try{
               const rs = await axios.post(process.env.REACT_APP_API_URL+"/authenticate/refresh",{
                  token:tokenService.getLocalRefreshToken(),
               });

               const newAuth = rs.data;
               tokenService.setAuth(newAuth);

               return instance(originalConfig);
            }catch(_error){
               tokenService.removeAuth();
               store.dispatch(removeUser({}));
               return Promise.reject(_error);
            }
         }
      }
      return Promise.reject(err);
   }
);

export default instance;