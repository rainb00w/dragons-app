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
    [authOperations.register.fulfilled](state, action) {
      // console.log('action payload', action);
      state.user = action?.payload.name;
      state.token = action?.payload.token;
      state.isLoggedIn = true;
    },
    [authOperations.logIn.pending](state) {
      state.loginError = null;
      state.isLogging = true;
    },
    [authOperations.logIn.rejected](state, action) {
      state.loginError = action.payload;
    },
    [authOperations.logIn.fulfilled](state, action) {
      // console.log('login payload', state.payload);
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
    // [authOperations.fetchCurrentUser.fulfilled](state, action) {
    //   state.user = action.payload;
    //   state.isLoggedIn = true;
    //   // console.log('fetchCurrentUser SLICE', state.isLoggedIn);
    // },
  },
});

export default authSlice.reducer;
