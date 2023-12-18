import { Book } from "./books";

export interface EditBookDialogProps {
  book?: Book;
}

export interface ConfirmDialogProps {
  title: string;
  message: string;
  fn: () => void;
}
