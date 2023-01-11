import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loadPosts = createAsyncThunk(
  "posts/fetchByArticleId",
  async (id) => {
    const response = await fetch(`api/articles/${id}/comments`);
    const json = await response.json();
    return json;
  }
);

export const loadPostsForSubReddits = createAsyncThunk(
  "posts/fetchBySubReddit",
  async (subReddit) => {
    const url = `https://www.reddit.com/r/${subReddit}/.json`;
    const response = await fetch(url);
    const json = await response.json();
    return json;
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    status: "idle",
    error: "",
  },
  reducers: {},
  extraReducers: {
    [loadPostsForSubReddits.pending]: (state, action) => {
      state.status = "loading";
    },
    [loadPostsForSubReddits.fulfilled]: (state, action) => {
      state.posts = action.payload.data.children;
      state.status = "succeeded";
    },
    [loadPostsForSubReddits.rejected]: (state, action) => {
      state.error = action.error.message;
      state.status = "failed";
    },
  },
});

export const selectPosts = (state) => state.posts.posts;
export default postsSlice.reducer;
