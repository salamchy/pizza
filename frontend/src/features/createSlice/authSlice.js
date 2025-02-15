import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../createApi/authApi.js";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: false,
    token: null,
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload.user;
      state.isAdmin = action.payload.user.isAdmin;
      state.isAuthenticated = true;
      state.token = action.payload.token;
    },
    clearUser(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    // Add extra reducers for authApi
    builder
      // When login is successful, update the state with user and token
      .addMatcher(
        authApi.endpoints.loginUser.matchFulfilled,
        (state, { payload }) => {
          state.user = payload.user;
          state.token = payload.token;
          state.isAuthenticated = true;
        }
      )
      // When logout is successful, reset the state
      .addMatcher(authApi.endpoints.logoutUser.matchFulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.token = null;
      })
      // When registration is successful, update the state with user and token
      .addMatcher(
        authApi.endpoints.registerUser.matchFulfilled,
        (state, { payload }) => {
          state.user = payload.user;
          state.token = payload.token;
          state.isAuthenticated = true;
        }
      );
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
