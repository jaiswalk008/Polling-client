import { configureStore } from '@reduxjs/toolkit';
import authSlice from './auth';
import pollSlice from './poll';

export const store:any = configureStore({
  reducer: {
    auth: authSlice.reducer,
    polls: pollSlice.reducer,
  },
});

export const authActions = authSlice.actions;
export const pollActions:any = pollSlice.actions;
