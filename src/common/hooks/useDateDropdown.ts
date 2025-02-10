import { useState, useEffect } from 'react'
import { DropdownOption } from '../types/SearchableDropdown.type'
import { DateDropdownProps } from '../types/DateDropdown.type'
import { createValidDate, getDaysInMonth } from '../utils'

/**
 * Handles the logic  and state in the `DateDropdown` component. Built with JS
 * native `Date` object
 */
export function useDateDropdown({
  value,
  minYear = 1900,
  maxYear = 2000,
  onChange,
}: DateDropdownProps) {
  const [day, setDay] = useState<number>()
  const [month, setMonth] = useState<number>()
  const [year, setYear] = useState<number>()

  //FIXME: This does not need to be awful useEffect
  useEffect(() => {
    if (value instanceof Date && !isNaN(value.getTime())) {
      setDay(value.getDate())
      setMonth(value.getMonth() + 1)
      setYear(value.getFullYear())
    } else {
      setDay(undefined)
      setMonth(undefined)
      setYear(undefined)
    }
  }, [value])

  const handleDateChange = (
    newDay?: number,
    newMonth?: number,
    newYear?: number
  ) => {
    const date = createValidDate({
      day: newDay ?? day,
      month: newMonth ?? month,
      year: newYear ?? year,
    })
    onChange?.(date)
  }

  const monthOptions: Array<DropdownOption<string>> = Array.from(
    { length: 12 },
    (_, i) => ({
      value: String(i + 1),
      //TODO: Check if should be locale
      label: new Date(2000, i, 1).toLocaleString('default', {
        month: 'long',
      }),
    })
  )

  const yearOptions: Array<DropdownOption<string>> = Array.from(
    { length: maxYear - minYear + 1 },
    (_, i) => ({
      value: String(minYear + i),
      label: String(minYear + i),
    })
  )

  const daysInMonth = month && year ? getDaysInMonth(month, year) : 31

  const dayOptions: Array<DropdownOption<string>> = Array.from(
    { length: daysInMonth },
    (_, i) => ({
      value: String(i + 1),
      label: String(i + 1),
    })
  )

  return {
    day,
    setDay,
    month,
    setMonth,
    year,
    setYear,
    handleDateChange,
    dayOptions,
    monthOptions,
    yearOptions,
  }
}
