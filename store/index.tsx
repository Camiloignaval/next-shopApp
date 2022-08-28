import { configureStore } from "@reduxjs/toolkit";
import UIReducer from "./Slices/UISlice";
import CartReducer from "./Slices/CartSlice";
import AuthReducer from "./Slices/AuthSlice";
import { authApi } from "./RTKQuery/authApi";
import { ordersApi } from "./RTKQuery/ordersApi";

const apisMiddlewares = [authApi.middleware, ordersApi.middleware];

export const store = configureStore({
  reducer: {
    ui: UIReducer,
    cart: CartReducer,
    auth: AuthReducer,
    [authApi.reducerPath]: authApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apisMiddlewares),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
