import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/UserSlice";
import LocalizationReducer from "./slice/LocalizationSlice";
import localeMiddleware from "./localeMiddleware";

export const store = configureStore({
  reducer: {
    user: userReducer,
    locale: LocalizationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localeMiddleware),
});
