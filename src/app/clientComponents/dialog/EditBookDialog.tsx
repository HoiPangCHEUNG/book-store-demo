"use client";

import * as Form from "@radix-ui/react-form";
import { Pencil2Icon, UpdateIcon } from "@radix-ui/react-icons";
import { Button, Dialog, Flex, TextArea, TextField } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import {
  addBook,
  addBookReminder,
  bookCategory,
  bookCategoryOptions,
  bookName,
  bookPrice,
  updateBook,
  updateBookReminder,
  invalidBookPrice,
  missingBookCategory,
  missingBookName,
  missingBookPrice,
  bookDescription,
  missingBookDescription,
  bookAuthor,
  missingBookAuthor,
  bookImageUrl,
  missingBookImageUrl,
  invalidBookImageUrl,
  bookCreated,
  bookUpdated,
} from "@/app/constant/book";
import {
  cancelButtonText,
  saveButtonText,
  updateButtonText,
} from "@/app/constant/button";
import { createBook, updateBookById } from "@/lib/features/book";
import { closeDialog, openDialog } from "@/lib/features/bookDialog";
import { openToaster } from "@/lib/features/toaster";
import { useAppSelector, useAppStore } from "@/lib/hooks";
import { isValidUrl } from "@/lib/utils/url";

import { Select } from "../select/Select";

/**
 * EditBookDialog accepts a book object and renders a dialog with form fields
 * if book is undefined, it will render a dialog with empty form fields (Create Book)
 * if book is not undefined, it will render a dialog with form fields filled with book data (Update Book)
 */
export const EditBookDialog = () => {
  const bookDialog = useAppSelector((state) => state.bookDialog);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(
    bookDialog.book?.category
  );
  const [isMissingCategory, setIsMissingCategory] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = (event: any) => {
    event.preventDefault();

    if (
      !selectedCategory ||
      !name ||
      !price ||
      !selectedCategory ||
      !description ||
      !imageUrl ||
      !author
    )
      return;

    // Create a new book
    if (!bookDialog.book) {
      dispatch(
        createBook({
          name: name,
          price: price,
          category: selectedCategory,
          description: description,
          imageUrl: imageUrl,
          author: author,
        })
      );
      dispatch(openToaster({ title: bookCreated, msg: name }));
    } else {
      // Update an existing book
      dispatch(
        updateBookById({
          id: bookDialog.book.id,
          name: name,
          price: price,
          category: selectedCategory,
          description: description,
          imageUrl: imageUrl,
          author: author,
        })
      );
      dispatch(openToaster({ title: bookUpdated, msg: name }));
    }

    setOpen(false);
  };

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setIsMissingCategory(false);
  };

  const onOpenChange = (open: boolean) => {
    open ? dispatch(openDialog()) : dispatch(closeDialog());
  };

  useEffect(() => {
    // Reset form fields when dialog is closed
    if (!open) {
      setName("");
      setPrice("");
      setDescription("");
      setImageUrl("");
      setAuthor("");
      setSelectedCategory("");
      setIsMissingCategory(false);
      dispatch(closeDialog());
    }
  }, [open]);

  useEffect(() => {
    setOpen(bookDialog.open);
  }, [bookDialog.open]);

  useEffect(() => {
    if (bookDialog.book) {
      setName(bookDialog.book.name);
      setPrice(bookDialog.book.price);
      setDescription(bookDialog.book.description);
      setImageUrl(bookDialog.book.imageUrl);
      setAuthor(bookDialog.book.author);
      setSelectedCategory(bookDialog.book.category);
    }
  }, [bookDialog.book]);

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Content>
        <Dialog.Title className="flex items-center space-x-2">
          {bookDialog.book ? (
            <UpdateIcon width={20} height={20} />
          ) : (
            <Pencil2Icon width={20} height={20} />
          )}
          <div>{bookDialog.book === undefined ? addBook : updateBook}</div>
        </Dialog.Title>
        <Dialog.Description className="text-gray-400" mb="4" size="2">
          {bookDialog.book === undefined ? addBookReminder : updateBookReminder}
        </Dialog.Description>

        {/* Form Fields */}
        <Form.Root className="flex flex-col space-y-6" onSubmit={handleSubmit}>
          <Form.Field name="bookName">
            <div className="flex items-baseline justify-between">
              <Form.Label className="text-[15px] font-medium leading-[35px]">
                {bookName}
              </Form.Label>
              <Form.Message
                className="text-[13px] opacity-[0.8] dark:text-yellow-500"
                match="valueMissing"
              >
                {missingBookName}
              </Form.Message>
            </div>
            <Form.Control asChild required>
              <TextField.Input
                onChange={(event) => setName(event.target.value)}
                defaultValue={bookDialog.book?.name}
                placeholder="name"
              />
            </Form.Control>
          </Form.Field>
          <Form.Field name="bookAuthor">
            <div className="flex items-baseline justify-between">
              <Form.Label className="text-[15px] font-medium leading-[35px]">
                {bookAuthor}
              </Form.Label>
              <Form.Message
                className="text-[13px] opacity-[0.8] dark:text-yellow-500"
                match="valueMissing"
              >
                {missingBookAuthor}
              </Form.Message>
            </div>
            <Form.Control asChild required>
              <TextField.Input
                onChange={(event) => setAuthor(event.target.value)}
                defaultValue={bookDialog.book?.author}
                placeholder="author"
              />
            </Form.Control>
          </Form.Field>
          <Form.Field name="bookImageUrl">
            <div className="flex items-baseline justify-between">
              <Form.Label className="text-[15px] font-medium leading-[35px]">
                {bookImageUrl}
              </Form.Label>
              <Form.Message
                className="text-[13px] opacity-[0.8] dark:text-yellow-500"
                match="valueMissing"
              >
                {missingBookImageUrl}
              </Form.Message>
              <Form.Message
                className="text-[13px] opacity-[0.8] dark:text-yellow-500"
                match={(value) => !isValidUrl(value)}
              >
                {invalidBookImageUrl}
              </Form.Message>
            </div>
            <Form.Control asChild required>
              <TextField.Input
                onChange={(event) => setImageUrl(event.target.value)}
                defaultValue={bookDialog.book?.imageUrl}
                placeholder="url"
              />
            </Form.Control>
          </Form.Field>
          <Form.Field name="bookPrice">
            <div className="flex items-baseline justify-between">
              <Form.Label className="text-[15px] font-medium leading-[35px]">
                {bookPrice}
              </Form.Label>
              <Form.Message
                className="text-[13px] opacity-[0.8] dark:text-yellow-500"
                match="valueMissing"
              >
                {missingBookPrice}
              </Form.Message>
              <Form.Message
                className="text-[13px] opacity-[0.8] dark:text-yellow-500"
                match={(value) => isNaN(Number(value)) === true}
              >
                {invalidBookPrice}
              </Form.Message>
            </div>
            <Form.Control asChild required>
              <TextField.Input
                onChange={(event) => setPrice(event.target.value)}
                defaultValue={bookDialog.book?.price}
                placeholder="Price"
              />
            </Form.Control>
          </Form.Field>
          <Form.Field name="bookCategory">
            <div className="flex items-baseline justify-between">
              <Form.Label className="text-[15px] font-medium leading-[35px]">
                {bookCategory}
              </Form.Label>
              <Form.Message
                className={`text-[13px] opacity-[0.8] dark:text-yellow-500 ${
                  isMissingCategory ? "" : "hidden"
                }`}
              >
                {missingBookCategory}
              </Form.Message>
            </div>
            <Form.Control asChild required>
              <Select
                defaultValue={bookDialog.book?.category}
                categories={bookCategoryOptions}
                onValueChange={handleCategoryChange}
              />
            </Form.Control>
          </Form.Field>
          <Form.Field name="bookDescription">
            <div className="flex items-baseline justify-between">
              <Form.Label className="text-[15px] font-medium leading-[35px]">
                {bookDescription}
              </Form.Label>
              <Form.Message
                className="text-[13px] opacity-[0.8] dark:text-yellow-500"
                match="valueMissing"
              >
                {missingBookDescription}
              </Form.Message>
            </div>
            <Form.Control asChild required>
              <TextArea
                className="border-red-100"
                onChange={(event) => setDescription(event.target.value)}
                defaultValue={bookDialog.book?.description}
                placeholder="Description"
                size="3"
              />
            </Form.Control>
          </Form.Field>

          {/* Form Action Buttons */}
          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                {cancelButtonText}
              </Button>
            </Dialog.Close>
            <Button
              onClick={() => {
                selectedCategory === ""
                  ? setIsMissingCategory(true)
                  : setIsMissingCategory(false);
              }}
            >
              {bookDialog.book ? updateButtonText : saveButtonText}
            </Button>
          </Flex>
        </Form.Root>
      </Dialog.Content>
    </Dialog.Root>
  );
};
