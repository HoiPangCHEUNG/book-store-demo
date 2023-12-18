"use client";
import { MixIcon, PlusIcon } from "@radix-ui/react-icons";
import { Heading, IconButton, Text } from "@radix-ui/themes";
import { useDispatch } from "react-redux";

import { appDescription, appTitle } from "@/app/constant/header";
import { openDialog } from "@/lib/features/bookDialog";

/**
 * Header renders the app title and description
 */
export const Header = () => {
  const dispatch = useDispatch();

  const handleAddBook = () => {
    dispatch(openDialog());
  };
  return (
    <div className="flex items-center w-full">
      <div>
        <div className="flex items-center space-x-2">
          <MixIcon width={20} height={20} />
          <Heading>{appTitle}</Heading>
        </div>
        <Text color="gray">{appDescription}</Text>
      </div>
      <div className="flex-grow"></div>
      <IconButton radius="full" onClick={handleAddBook}>
        <PlusIcon width={20} height={20} />
      </IconButton>
    </div>
  );
};
