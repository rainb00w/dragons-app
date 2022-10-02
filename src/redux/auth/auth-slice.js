import { createSlice } from '@reduxjs/toolkit';
import authOperations from './auth-operations';

const initialState = {
  user: null,
  token: null,
  isLoggedIn: false,
  isLogging: false,
  loginError: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: {
    [authOperations.logIn.pending](state) {
      state.loginError = null;
      state.isLogging = true;
    },
    [authOperations.logIn.rejected](state, action) {
      state.loginError = action.payload;
    },
    [authOperations.logIn.fulfilled](state, action) {
      state.user = action?.payload.name;      ;
      state.token = action?.payload.token;
      state.isLoggedIn = true;
      state.isLogging = false;
      state.loginError = null;
    },
    [authOperations.logOut.fulfilled](state) {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
    },
  },
});

export default authSlice.reducer;
