import { useState, useEffect } from 'react'
import { DropdownOption } from '../types/SearchableDropdown.type'

const getDaysInMonth = (month: number, year: number) => {
  return new Date(year, month, 0).getDate()
}

const createValidDate = (
  day: number | undefined,
  month: number | undefined,
  year: number | undefined
): Date | null => {
  if (!day || !month || !year) return null

  const daysInMonth = getDaysInMonth(month, year)
  const adjustedDay = day > daysInMonth ? daysInMonth : day

  try {
    const date = new Date(year, month - 1, adjustedDay)
    return date.getMonth() === month - 1
      ? date
      : new Date(year, month - 1, daysInMonth)
  } catch {
    return null
  }
}

export const useDateDropdown = (
  value: Date | null,
  minYear: number,
  maxYear: number,
  onChange?: (date: Date | null) => void
) => {
  const [day, setDay] = useState<number>()
  const [month, setMonth] = useState<number>()
  const [year, setYear] = useState<number>()

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
    const date = createValidDate(
      newDay ?? day,
      newMonth ?? month,
      newYear ?? year
    )
    onChange?.(date)
  }

  const monthOptions: DropdownOption<string>[] = Array.from(
    { length: 12 },
    (_, i) => ({
      value: String(i + 1),
      label: new Date(2000, i, 1).toLocaleString('default', {
        month: 'long',
      }),
    })
  )

  const yearOptions: DropdownOption<string>[] = Array.from(
    { length: maxYear - minYear + 1 },
    (_, i) => ({
      value: String(minYear + i),
      label: String(minYear + i),
    })
  )

  const daysInMonth = month && year ? getDaysInMonth(month, year) : 31
  const dayOptions: DropdownOption<string>[] = Array.from(
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
