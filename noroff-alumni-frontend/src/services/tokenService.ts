import Auth from "../models/Auth";

class TokenService {
   getLocalRefreshToken() {
     const auth = JSON.parse(localStorage.getItem("auth")!);
     return auth?.refresh_token;
   }
 
   getLocalAccessToken() {
     const auth = JSON.parse(localStorage.getItem("auth")!);
     return auth?.access_token;
   }
 
   updateLocalAccessToken(token:string) {
     let auth:Auth = JSON.parse(localStorage.getItem("auth")!);
     console.log(auth);
     auth.access_token = token;
     localStorage.setItem("auth", JSON.stringify(auth));
   }
 
   getAuth() {
     return JSON.parse(localStorage.getItem("auth")!);
   }
 
   setAuth(auth:Auth) {
     localStorage.setItem("auth", JSON.stringify(auth));
   }
 
   removeAuth() {
     localStorage.removeItem("auth");
   }
 }

 const service = new TokenService();
 
 export default service;