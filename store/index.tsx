import { configureStore } from "@reduxjs/toolkit";
import UIReducer from "./Slices/UISlice";
import CartReducer from "./Slices/CartSlice";
import AuthReducer from "./Slices/AuthSlice";
import { authApi } from "./RTKQuery/authApi";

export const store = configureStore({
  reducer: {
    ui: UIReducer,
    cart: CartReducer,
    auth: AuthReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
