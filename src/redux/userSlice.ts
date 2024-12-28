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
    categories: string[];
    sources: string[];
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
    categories: [],
    sources: [],
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
    return JSON.parse(serializedState);
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
      localStorage.setItem("userState", JSON.stringify(state));
    },
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("userState", JSON.stringify(state));
    },
    updateUserPreference: (
      state,
      action: {
        payload: { categories: string[]; sources: string[]; authors: string[] };
      }
    ) => {
      state.preferences = { ...state.preferences, ...action.payload };
      localStorage.setItem("userState", JSON.stringify(state));
    },
    clearUserPreferences: (state) => {
      state.preferences = {
        categories: [],
        sources: [],
        authors: [],
      };
      localStorage.setItem("userState", JSON.stringify(state));
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.preferences = {
        categories: [],
        sources: [],
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
      localStorage.setItem("userState", JSON.stringify(state));
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
