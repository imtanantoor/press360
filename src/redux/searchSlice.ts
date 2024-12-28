import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ArticleService from "../services/ArticleService";
import ArticleItem from "../models/ArticleItem";
interface SearchState {
  query: string;
  filters: Record<string, string>;
  articles: ArticleItem[];
  loading: boolean;
}

const initialState: SearchState = {
  query: "",
  filters: {
    date: "",
    category: "",
    source: "",
  },
  articles: [],
  loading: false,
};

export const fetchSearchResults = createAsyncThunk(
  "search/fetchSearchResults",
  async (searchParams: Record<string, string>) => {
    const articleService = ArticleService.getInstance();
    const articles = await articleService.searchArticles(searchParams);
    return articles;
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSearchResults.fulfilled, (state, action) => {
      state.articles = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchSearchResults.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchSearchResults.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export const { setQuery, setFilters } = searchSlice.actions;

export default searchSlice.reducer;
