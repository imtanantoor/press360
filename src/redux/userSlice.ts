import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ArticleItem from "../models/ArticleItem";
import ArticleService from "../services/ArticleService";

interface User {
 name: string;
}
interface UserState {
 user: User | null;
 isLoggedIn: boolean;
 preferences: {
  category: string[];
  source: string[];
  authors: string[];
 };
 myFeed: ArticleItem[];
 myFeedLoading: boolean;
}

// Define the default initial state first
const defaultInitialState: UserState = {
 user: null,
 isLoggedIn: false,
 preferences: {
  category: [],
  source: [],
  authors: [],
 },
 myFeed: [],
 myFeedLoading: false,
};

const loadStateFromStorage = (): UserState => {
 try {
  const serializedState = localStorage.getItem("userState");
  if (serializedState === null) {
   return defaultInitialState;
  }
  // Parse the stored state and merge with default initial state to ensure myFeed is empty
  const parsedState = JSON.parse(serializedState);
  return {
   ...parsedState,
   myFeed: [],
   myFeedLoading: false,
  };
 } catch (err) {
  return defaultInitialState;
 }
};

const initialState: UserState = loadStateFromStorage();

export const fetchMyFeed = createAsyncThunk(
 "search/fetchMyFeed",
 async (userPreferences: Record<string, string[]>) => {
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
   const stateForStorage = { ...state, myFeed: [] };
   localStorage.setItem("userState", JSON.stringify(stateForStorage));
  },
  setUser: (state, action) => {
   state.user = action.payload;
   const stateForStorage = { ...state, myFeed: [] };
   localStorage.setItem("userState", JSON.stringify(stateForStorage));
  },
  updateUserPreference: (
   state,
   action: {
    payload: { category: string[]; source: string[]; authors: string[] };
   }
  ) => {
   state.preferences = { ...state.preferences, ...action.payload };
   const stateForStorage = { ...state, myFeed: [] };
   localStorage.setItem("userState", JSON.stringify(stateForStorage));
  },
  clearUserPreferences: (state) => {
   state.preferences = {
    category: [],
    source: [],
    authors: [],
   };
   const stateForStorage = { ...state, myFeed: [] };
   localStorage.setItem("userState", JSON.stringify(stateForStorage));
  },
  logout: (state) => {
   state.isLoggedIn = false;
   state.user = null;
   state.preferences = {
    category: [],
    source: [],
    authors: [],
   };
   localStorage.setItem("userState", JSON.stringify(defaultInitialState));
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
 logout,
} = userSlice.actions;

export default userSlice.reducer;
