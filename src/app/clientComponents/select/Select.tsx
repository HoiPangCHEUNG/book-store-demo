"use client";

import { Select as Sel } from "@radix-ui/themes";
import { Fragment, forwardRef } from "react";

import { selectCategoryText } from "@/app/constant/book";
import { SelectProps } from "@/app/interface/select";

/**
 * Select renders a list of categories and items
 */
export const Select = forwardRef((props: SelectProps) => {
  return (
    <Sel.Root
      onValueChange={props.onValueChange}
      defaultValue={props.defaultValue}
    >
      {/* https://www.radix-ui.com/themes/docs/components/select#placeholder */}
      {/* @ts-expect-error ts(2322) */}
      <Sel.Trigger className="w-full" placeholder={selectCategoryText} />
      <Sel.Content position="popper">
        {props.categories.map((category, categoryIndex) => (
          <Fragment key={category.label}>
            <Sel.Group>
              <Sel.Label>{category.label}</Sel.Label>
              {category.items.map((item) => (
                <Sel.Item
                  key={item.value}
                  value={item.value}
                  disabled={item.disabled}
                >
                  {item.label}
                </Sel.Item>
              ))}
            </Sel.Group>
            {categoryIndex < props.categories.length - 1 && <Sel.Separator />}
          </Fragment>
        ))}
      </Sel.Content>
    </Sel.Root>
  );
});

Select.displayName = "Select";
