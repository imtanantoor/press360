import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ArticleItem from "../models/ArticleItem";
import ArticleService from "../services/ArticleService";

interface User {
  name: string;
}
interface UserState {
  user: User | null;
  isLoggedIn: boolean;
  preferences: Record<string, string>;
  myFeed: ArticleItem[];
  myFeedLoading: boolean;
}

const initialState: UserState = {
  user: null,
  isLoggedIn: false,
  preferences: {},
  myFeed: [],
  myFeedLoading: false, 
  };


export const fetchMyFeed = createAsyncThunk(
  "search/fetchMyFeed",
  async (userPreferences: Record<string, string>) => {
    const articleService = ArticleService.getInstance();
    const articles = await articleService.searchArticles(userPreferences);
    return articles;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    updateUserPreference: (
      state,
      action: { payload: Record<string, string> }
    ) => {
      state.preferences = { ...state.preferences, ...action.payload };
    },
    clearUserPreferences: (state) => {
      state.preferences = {};
    },
  },
  extraReducers: (builder) => {
    // My Feed
    builder.addCase(fetchMyFeed.fulfilled, (state, action) => {
      state.myFeed = action.payload;
      state.myFeedLoading = false;
    });
    builder.addCase(fetchMyFeed.pending, (state, action) => {
      state.myFeedLoading = true;
    });
    builder.addCase(fetchMyFeed.rejected, (state, action) => {
      state.myFeedLoading = false;
    });
  },
});

export const {
  setIsLoggedIn,
  setUser,
  updateUserPreference,
  clearUserPreferences,
} = userSlice.actions;

export default userSlice.reducer;
