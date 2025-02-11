import { HTMLAttributes } from 'react'
import { ButtonVariant } from './Button.type'

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
  buttonVariant?: ButtonVariant
}

export type { DropdownOption, DropdownProps }
