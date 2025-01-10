import { configureStore } from "@reduxjs/toolkit";
import imageReducer from "../features/imageSlice";
import aboutReducer from "../features/aboutSlice";
import serviceReducer from "../features/serviceSlice";
import contactReducer from "../features/contactSlice";
import contentReducer from "../features/contentSlice";
import userReducer from "../features/loginSlice";

export const store = configureStore({
  reducer: {
    imageContent: imageReducer,
    aboutContent: aboutReducer,
    serviceContentData: serviceReducer,
    contactData: contactReducer,
    content: contentReducer,
    user: userReducer,
  },
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export default store;
