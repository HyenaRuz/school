import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  locale: "ua",
  messages: {},
};

const localizationSlice = createSlice({
  name: "locale",
  initialState,
  reducers: {
    setLocale(state, action) {
      state.locale = action.payload;
    },
    setMessages(state, action) {
      state.messages = action.payload;
    },
  },
});

export const { setLocale, setMessages } = localizationSlice.actions;
export default localizationSlice.reducer;
