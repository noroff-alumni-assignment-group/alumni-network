import { createSlice } from "@reduxjs/toolkit";
import User from "../models/User";

const initialState:User = {}

/**
 * Creates a reducer for keeping the state of the user-data.
 */
export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      return action.payload;
    },
    removeUser: (state, action) => {
      return {};
    },
  }
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;