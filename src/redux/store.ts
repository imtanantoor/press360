import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./searchSlice";
import userReducer from "./userSlice";
import preferencesPopupReducer from "./preferencesPopupSlice";

const store = configureStore({
 reducer: {
  search: searchReducer,
  user: userReducer,
  preferencesPopup: preferencesPopupReducer,
 },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
