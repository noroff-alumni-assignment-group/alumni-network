import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Auth from "../models/Auth";
import UserService from "../services/UserService";
import LoginRequest from "../models/LoginRequest";

const initialState:Auth = {}

export const loginAsync = createAsyncThunk(
   "auth/loginAsync",
   async (payload:LoginRequest)=> {
      const response = await UserService.login(payload);
      if(response.status === 200){
         return response.data;
      }
   }
)

export const logout = createAsyncThunk(
   "auth/logoutAsync",
   async (payload:string)=> {
      const response = await UserService.logout(payload);
      if(response.status === 200){
         return {};
      }
   }
)

/**
 * Creates a reducer for keeping the state of the user-data.
 */
export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setAuth: (state, action) => {
      return action.payload;
    },
    removeAuth: (state, action) => {
      return {};
    },
  },
  extraReducers: (builder) =>{
   builder.addCase(loginAsync.fulfilled,(state,action)=>{
      return action.payload;
   })
   builder.addCase(logout.fulfilled,(state,action)=>{
      return action.payload;
   })
  },
});

export const { setAuth, removeAuth } = authSlice.actions;
export default authSlice.reducer;