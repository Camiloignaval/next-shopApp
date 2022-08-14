import { configureStore } from "@reduxjs/toolkit";
import UIReducer from "./Slices/UISlice";

export const store = configureStore({
  reducer: { ui: UIReducer },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;