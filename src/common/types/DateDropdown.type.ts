interface DateDropdownProps {
  value?: Date | null
  onChange?: (date: Date | null) => void
  minYear?: number
  maxYear?: number
}

export type { DateDropdownProps }
