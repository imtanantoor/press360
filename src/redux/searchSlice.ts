import { createSlice } from "@reduxjs/toolkit";
interface SearchState {
 query: string;
 filters: Record<string, string>;
}

const initialState: SearchState = {
 query: "",
 filters: {},
};

const searchSlice = createSlice({
 name: "search",
 initialState,
 reducers: {
  setQuery: (state, action) => {
   state.query = action.payload;
  },
 },
});

export const { setQuery } = searchSlice.actions;

export default searchSlice.reducer;
