import { DropdownProps } from './SearchableDropdown.type'

type Callback = <T>(value: T) => void

interface MultiselectDropdownProps<T extends string>
  extends Omit<DropdownProps<T>, 'onChange'> {
  onChange?: Callback
  onValueRemoved?: Callback
  selectedValues?: Array<T>
}

export type { MultiselectDropdownProps }
