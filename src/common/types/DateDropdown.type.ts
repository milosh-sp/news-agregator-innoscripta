interface DateDropdownProps {
  value?: Date | null
  onChange?: (date: Date | null) => void
  minYear?: number
  maxYear?: number
  label?: string
}

export type { DateDropdownProps }
