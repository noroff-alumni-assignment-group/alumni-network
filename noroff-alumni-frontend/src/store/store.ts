import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import authSlice from './authSlice';


const store = configureStore({
   reducer: {
      user: userSlice,
      auth: authSlice
   }
});

export type RootState = ReturnType<typeof store.getState>;

export default store;