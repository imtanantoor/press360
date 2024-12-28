import { createSlice } from "@reduxjs/toolkit";

interface User {
  name: string;
}
interface UserState {
  user: User | null;
  isLoggedIn: boolean;
  preferences: Record<string, string>;
}

const initialState: UserState = {
  user: null,
  isLoggedIn: false,
  preferences: {},
};

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
});

export const {
  setIsLoggedIn,
  setUser,
  updateUserPreference,
  clearUserPreferences,
} = userSlice.actions;

export default userSlice.reducer;
