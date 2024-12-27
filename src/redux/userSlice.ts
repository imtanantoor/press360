import { createSlice } from "@reduxjs/toolkit";

interface UserState {
 preferences: {
  filters: Record<string, string>;
 };
}

const initialState: UserState = {
 preferences: {
  filters: {},
 },
};

const userSlice = createSlice({
 name: "user",
 initialState,
 reducers: {
  setFilterPreferences: (state, action) => {
   state.preferences.filters = action.payload;
  },
  updateFilterPreference: (
   state,
   action: { payload: { key: string; value: string } }
  ) => {
   state.preferences.filters[action.payload.key] = action.payload.value;
  },
  clearFilterPreferences: (state) => {
   state.preferences.filters = {};
  },
 },
});

export const {
 setFilterPreferences,
 updateFilterPreference,
 clearFilterPreferences,
} = userSlice.actions;

export default userSlice.reducer;
