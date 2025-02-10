import { DropdownProps } from './SearchableDropdown.type'

interface MultiselectDropdownProps<T extends string> extends DropdownProps<T> {
  onSelect?: (values: Array<T>) => void
  selectedValues?: Array<T>
}

export type { MultiselectDropdownProps }
