import { render, fireEvent, screen } from "@testing-library/react";
import React from "react";

import "@testing-library/jest-dom";
import { removeBookById } from "@/lib/features/book";
import { openDialog } from "@/lib/features/bookDialog";
import { openToaster } from "@/lib/features/toaster";
import * as reduxHooks from "@/lib/hooks";

import { Card } from "./Card";

// Mock the Redux dispatch and external functions
jest.mock("@/lib/hooks", () => ({
  useAppDispatch: jest.fn(),
}));
jest.mock("@/lib/features/book", () => ({
  removeBookById: jest.fn(),
}));
jest.mock("@/lib/features/bookDialog", () => ({
  openDialog: jest.fn(),
}));
jest.mock("@/lib/features/toaster", () => ({
  openToaster: jest.fn(),
}));

describe("Card Component", () => {
  const mockDispatch = jest.fn();
  beforeEach(() => {
    (reduxHooks.useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
  });

  const mockBook = {
    id: "1",
    name: "Test Book",
    author: "Test Author",
    price: "10.00",
    category: "fiction",
    description: "Test Description",
    imageUrl: "/test-image.jpg",
  };

  it("renders correctly with given props", () => {
    render(<Card book={mockBook} />);
    expect(screen.getByText("Test Book")).toBeInTheDocument();
    expect(screen.getByText("by Test Author")).toBeInTheDocument();
    expect(screen.getByText("$10.00")).toBeInTheDocument();
  });

  it("expands and collapses description on click", () => {
    render(<Card book={mockBook} />);
    const toggleDescriptionButton = screen.getByText(/Click to expand/i);
    fireEvent.click(toggleDescriptionButton);
    expect(screen.getByText(/Click to collapse/i)).toBeInTheDocument();

    fireEvent.click(toggleDescriptionButton);
    expect(screen.getByText(/Click to expand/i)).toBeInTheDocument();
  });

  it("calls removeBookById when remove button is clicked", () => {
    render(<Card book={mockBook} />);
    const removeButton = screen.getByRole("button");
    fireEvent.click(removeButton);
    expect(removeBookById).toHaveBeenCalledWith(mockBook.id);
    expect(mockDispatch).toHaveBeenCalled();
  });

  it("calls openDialog when edit is clicked", () => {
    render(<Card book={mockBook} />);
    const bookName = screen.getByText("Test Book");
    fireEvent.click(bookName);
    expect(openDialog).toHaveBeenCalledWith(mockBook);
  });
});
