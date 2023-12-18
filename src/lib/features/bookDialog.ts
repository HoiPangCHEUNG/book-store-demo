import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Book } from "@/app/interface/books";

interface DialogState {
  open: boolean;
  book?: Book;
}

const initialState: DialogState = {
  open: false,
  book: undefined,
};

export const dialog = createSlice({
  name: "bookEditDialog",
  initialState,
  reducers: {
    openDialog: (state, action: PayloadAction<Book | undefined>) => {
      state.open = true;
      state.book = action.payload;
    },
    closeDialog: (state) => {
      state.open = false;
      state.book = undefined;
    },
  },
});

export const { openDialog, closeDialog } = dialog.actions;
export default dialog.reducer;
