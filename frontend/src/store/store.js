import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../features/createApi/authApi.js";
import authReducer from "../features/createSlice/authSlice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});
