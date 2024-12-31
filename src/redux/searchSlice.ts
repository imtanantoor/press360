import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ArticleService from "../services/ArticleService";
import ArticleItem from "../models/ArticleItem";
interface SearchState {
  filters: Record<string, string>;
  articles: ArticleItem[];
  searchResults: ArticleItem[];
  loading: boolean;
  searching: boolean;
  myFeed: ArticleItem[];
  myFeedLoading: boolean;
}

const initialState: SearchState = {
  filters: {
    q: "",
    date: "",
    category: "",
    source: "",
  },
  searchResults: [],
  articles: [],
  loading: false,
  searching: false,
  myFeed: [],
  myFeedLoading: false,
};

export const fetchArticles = createAsyncThunk(
  "search/fetchArticles",
  async () => {
    const articleService = ArticleService.getInstance();
    const articles = await articleService.getArticles();
    return articles;
  }
);

export const fetchSearchResults = createAsyncThunk(
  "search/fetchSearchResults",
  async (searchParams: Record<string, string | string[]>) => {
    const articleService = ArticleService.getInstance();
    const articles = await articleService.searchArticles(searchParams);
    return articles;
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Articles
    builder.addCase(fetchArticles.fulfilled, (state, action) => {
      state.articles = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchArticles.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchArticles.rejected, (state, action) => {
      state.loading = false;
    });

    // Search Results
    builder.addCase(fetchSearchResults.fulfilled, (state, action) => {
      state.searchResults = action.payload;
      state.searching = false;
    });
    builder.addCase(fetchSearchResults.pending, (state, action) => {
      state.searching = true;
    });
    builder.addCase(fetchSearchResults.rejected, (state, action) => {
      state.searching = false;
    });
  },
});

export const { setFilters } = searchSlice.actions;

export default searchSlice.reducer;
