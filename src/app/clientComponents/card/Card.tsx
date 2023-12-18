"use client";
import { Cross1Icon } from "@radix-ui/react-icons";
import { Badge, Box, Flex, IconButton, Text } from "@radix-ui/themes";
import Image from "next/image";
import { useEffect, useState } from "react";

import { bookCategoryOptions, unknownCategory } from "@/app/constant/book";
import { clickToCollapse, clickToExpand } from "@/app/constant/button";
import { CardProps } from "@/app/interface/card";
import { removeBookById } from "@/lib/features/book";
import { openDialog } from "@/lib/features/bookDialog";
import { useAppDispatch } from "@/lib/hooks";

/**
 * Card that store the book information
 *
 */
export const Card = (props: CardProps) => {
  const [expanded, setExpanded] = useState(false);
  const [imgSrc, setImgSrc] = useState(props.book.imageUrl);
  const dispatch = useAppDispatch();

  const getPrice = (price: string) => {
    return `$${price}`;
  };

  const getAuthor = (author: string) => {
    return `by ${author}`;
  };

  const getLabelByValue = (value: string): string => {
    for (const category of bookCategoryOptions) {
      for (const item of category.items) {
        if (item.value === value) {
          return item.label;
        }
      }
    }
    return unknownCategory;
  };

  const renderDescription = (description: string) => (
    <div className="flex flex-col space-y-2">
      {description.split("\n").map((line, index) => (
        <Text key={index} mt="6" size="2">
          {line}
        </Text>
      ))}
    </div>
  );

  const handleEditBookClick = () => {
    dispatch(openDialog(props.book));
  };

  useEffect(() => {
    setImgSrc(props.book.imageUrl);
  }, [props.book]);

  return (
    <div className="w-full mb-4 slide-up-animation cursor-pointer relative">
      <IconButton
        className="absolute -top-2 -right-2 z-20"
        size="1"
        radius="full"
        variant="outline"
        onClick={() => {
          dispatch(removeBookById(props.book.id));
        }}
      >
        <Cross1Icon width={10} height={10} />
      </IconButton>
      <Flex
        className="z-10 relative bg-neutral-900 px-4 py-2 opacity-95 hover-opacity rounded-lg"
        align="center"
      >
        <Box className="flex flex-col w-full">
          <div onClick={handleEditBookClick}>
            <Text size="8" weight="bold" color="gray">
              {props.book.name}
            </Text>
            <Text className="flex" mt="3" size="1">
              <div className="flex-grow">{getAuthor(props.book.author)}</div>
              <div>{getPrice(props.book.price)}</div>
            </Text>
            <Badge>{getLabelByValue(props.book.category)}</Badge>
            <div
              className={`book-description-container ${
                expanded ? "expanded" : "collapsed"
              }`}
            >
              {renderDescription(props.book.description)}
            </div>
          </div>
          <Text
            className="cursor-pointer text-center pt-2 text-yellow-500"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? clickToCollapse : clickToExpand}
          </Text>
        </Box>
      </Flex>
      <Image
        className="rounded-lg"
        src={imgSrc}
        onError={() => {
          setImgSrc("/placeholder.svg");
        }}
        alt=""
        fill
        style={{
          objectFit: "cover",
        }}
      />
    </div>
  );
};
