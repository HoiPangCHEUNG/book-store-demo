import { PayloadAction, createSlice, nanoid } from "@reduxjs/toolkit";

import { Book, BookData } from "@/app/interface/books";

// Initial state
const initialState: Book[] = [];

const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    createBook: {
      reducer: (state, action: PayloadAction<Book>) => {
        state.push(action.payload);
      },
      prepare: (payload: BookData) => {
        // Generate unique ID for each new book
        return {
          payload: {
            id: nanoid(),
            name: payload.name,
            price: payload.price,
            category: payload.category,
            description: payload.description,
            author: payload.author,
            imageUrl: payload.imageUrl,
          },
        };
      },
    },
    removeBookById: (state, action) => {
      return state.filter((book) => book.id !== action.payload);
    },
    updateBookById: (state, action: PayloadAction<Book>) => {
      const index = state.findIndex((book) => book.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
  },
});

// Export actions and reducer
export const { createBook, removeBookById, updateBookById } = bookSlice.actions;
export default bookSlice.reducer;
