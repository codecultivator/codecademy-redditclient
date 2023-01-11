import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loadSubReddits = createAsyncThunk(
  "subReddits/fetchAll",
  async () => {
    const url = "https://www.reddit.com/subreddits.json";
    const response = await fetch(url);
    const json = await response.json();
    return json;
  }
);

const subRedditsSlice = createSlice({
  name: "subReddits",
  initialState: {
    activeSubReddit: {},
    subReddits: [],
    status: "idle",
    error: "",
  },
  reducers: {},
  extraReducers: {
    [loadSubReddits.pending]: (state, action) => {
      state.status = "loading";
    },
    [loadSubReddits.fulfilled]: (state, action) => {
      state.subReddits = action.payload.data.children;
      state.status = "succeeded";
    },
    [loadSubReddits.rejected]: (state, action) => {
      state.error = action.error.message;
      state.status = "failed";
    },
  },
});

export default subRedditsSlice.reducer;
