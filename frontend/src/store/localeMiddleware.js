import { setMessages } from "./slice/LocalizationSlice";

const localeMiddleware = (store) => (next) => (action) => {
  if (action.type === "locale/setLocale") {
    const locale = action.payload;
    import(`../../public/locales/${locale}.json`)
      .then((messages) => {
        store.dispatch(setMessages(messages.default));
      })
      .catch((error) => {
        console.error("Failed to load localization file:", error);
      });
  }
  return next(action);
};

export default localeMiddleware;
