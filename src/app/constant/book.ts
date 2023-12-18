import { SelectCategory } from "../interface/select";

export const bookName = "Name";
export const bookCategory = "Category";
export const bookPrice = "Price";
export const bookDescription = "Description";
export const bookAuthor = "Author";
export const bookImageUrl = "Image Url";

export const missingBookName = "Please enter the book name";
export const missingBookAuthor = "Please enter the book author";
export const missingBookImageUrl = "Please enter the book image url";
export const invalidBookImageUrl = "Please enter a valid http / https url";
export const missingBookPrice = "Please enter the book price";
export const invalidBookPrice = "Please enter a valid book price";
export const missingBookCategory = "Please select the book category";
export const missingBookDescription = "Please enter the book description";

export const addBookReminder = "Add a new book to the store.";
export const updateBookReminder =
  "Have something to add? Update the book here.";

export const addBook = "Add Book";
export const updateBook = "Update Book";
export const noBook = "No Books Found Meow";

export const selectCategoryText = "Select Category";
export const unknownCategory = "Unknown";
export const bookCategoryOptions: SelectCategory[] = [
  {
    label: "Fiction",
    items: [
      { value: "1", label: "Detective" },
      { value: "2", label: "Crime" },
    ],
  },
  {
    label: "Family",
    items: [
      { value: "3", label: "Relationship" },
      { value: "4", label: "Cartoon" },
      { value: "5", label: "Picture Book" },
    ],
  },
  {
    label: "Horror",
    items: [{ value: "6", label: "Gothic" }],
  },
];
