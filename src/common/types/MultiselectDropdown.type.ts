import { DropdownProps } from './SearchableDropdown.type'

interface MultiselectDropdownProps<T extends string>
  extends Omit<DropdownProps<T>, 'onChange'> {
  onChange?: (values: Array<T>) => void
  selectedValues?: Array<T>
}

export type { MultiselectDropdownProps }
