"use client";
import * as Toast from "@radix-ui/react-toast";
import { Button } from "@radix-ui/themes";
import { useEffect, useRef, useState } from "react";

import { closeButtonText } from "@/app/constant/button";
import { closeToaster } from "@/lib/features/toaster";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

export const Toaster = () => {
  const timerRef = useRef(0);
  const [open, setOpen] = useState(false);
  const toaster = useAppSelector((state) => state.toaster);
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  useEffect(() => {
    if (toaster.open) {
      setOpen(false);
      window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => {
        setOpen(true);
      }, 100);
    }
  }, [toaster]);

  useEffect(() => {
    if (!open) {
      dispatch(closeToaster());
    }
  }, [open]);

  return (
    <Toast.Provider swipeDirection="up">
      <Toast.Root
        className="bg-neutral-900 border-2 bg-gray border-yellow-300 rounded-md shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] p-[15px] grid [grid-template-areas:_'title_action'_'description_action'] grid-cols-[auto_max-content] gap-x-[15px] items-center data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-swipeOut"
        open={open}
        onOpenChange={setOpen}
      >
        <div className="flex">
          <div className="flex flex-col flex-grow">
            <Toast.Title className="font-bold text-yellow-300 text-[15px]">
              {toaster.title}
            </Toast.Title>
            <Toast.Description className="text-gray-200 font-light" asChild>
              <div>{toaster.msg}</div>
            </Toast.Description>
          </div>
          <Toast.Close asChild>
            <div className="flex items-center">
              <Button className="">{closeButtonText}</Button>
            </div>
          </Toast.Close>
        </div>
      </Toast.Root>
      <Toast.Viewport className="[--viewport-padding:_25px] fixed bottom-0 right-0 flex flex-col p-[var(--viewport-padding)] gap-[10px] w-[390px] max-w-[100vw] m-0 list-none z-[2147483647] outline-none" />
    </Toast.Provider>
  );
};
