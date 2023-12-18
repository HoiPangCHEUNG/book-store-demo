import { configureStore } from "@reduxjs/toolkit";

import bookReducer from "./features/book";
import bookDialogReducer from "./features/bookDialog";
import toasterReducer from "./features/toaster";

export const makeStore = () => {
  return configureStore({
    reducer: {
      books: bookReducer,
      bookDialog: bookDialogReducer,
      toaster: toasterReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
