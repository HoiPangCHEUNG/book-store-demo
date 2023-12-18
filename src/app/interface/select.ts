interface SelectItem {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectCategory {
  label: string;
  items: SelectItem[];
}

export interface SelectProps {
  defaultValue?: string;
  categories: SelectCategory[];
  onValueChange: (value: string) => void;
}
