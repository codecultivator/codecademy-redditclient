import { createSlice } from "@reduxjs/toolkit";

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: {},
  },
  reducers: {
    // addCard: (state, action) => {
    //   state.cards[action.payload.id] = {
    //     ...action.payload,
    //   };
    // },
  },
});

// export const { addCard } = cardsSlice.actions;

export const selectPosts = (state) => state.posts.posts;
export default postsSlice.reducer;
