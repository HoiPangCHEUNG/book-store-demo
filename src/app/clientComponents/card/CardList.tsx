"use client";
import { Text } from "@radix-ui/themes";
import Image from "next/image";

import { noBook } from "@/app/constant/book";
import { useAppSelector } from "@/lib/hooks";

import placeholderSvg from "../../../../public/placeholder.svg";

import { Card } from "./Card";

/**
 * CardList renders the list of books
 */
export const CardList = () => {
  const books = useAppSelector((state) => state.books);

  return books && books.length > 0 ? (
    <div className="w-full">
      {books.map((book) => (
        <Card book={book} key={book.id} />
      ))}
    </div>
  ) : (
    <div className="flex flex-col space-y-4 items-center relative">
      <Image priority src={placeholderSvg} alt="" />
      <Text className="tracking-widest text-sm" color="gray">
        {noBook}
      </Text>
    </div>
  );
};
