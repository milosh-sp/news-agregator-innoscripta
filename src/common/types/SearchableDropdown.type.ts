import { HTMLAttributes } from 'react'

interface DropdownOption<T> {
  value: T
  label: string
  disabled?: boolean
}

interface DropdownProps<T>
  extends Omit<HTMLAttributes<HTMLElement>, 'onChange'> {
  options: Array<DropdownOption<T>>
  value?: T
  onChange?: (value: T) => void
  placeholder?: string
  disabled?: boolean
  searchPlaceholder?: string
  hideSearch?: boolean
}

export type { DropdownOption, DropdownProps }
