interface DropdownOption<T> {
  value: T
  label: string
  disabled?: boolean
}

interface DropdownProps<T> {
  options: DropdownOption<T>[]
  value?: T
  onChange?: (value: T) => void
  placeholder?: string
  disabled?: boolean
  searchPlaceholder?: string
}

export type { DropdownOption, DropdownProps }
