import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../features/posts/postsSlice";
import subRedditsReducer from "../features/subReddits/subRedditsSlice";

export default configureStore({
  reducer: {
    posts: postsReducer,
    subReddits: subRedditsReducer,
  },
});
