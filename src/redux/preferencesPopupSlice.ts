import { createSlice } from "@reduxjs/toolkit";

const PreferencesPopupSlice = createSlice({
    name: "preferencesPopup",
    initialState: {
        isOpen: false,
    },
    reducers: {
        openPreferencesPopup: (state) => {
            state.isOpen = true;
        },
        closePreferencesPopup: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openPreferencesPopup, closePreferencesPopup } = PreferencesPopupSlice.actions;
export default PreferencesPopupSlice.reducer;