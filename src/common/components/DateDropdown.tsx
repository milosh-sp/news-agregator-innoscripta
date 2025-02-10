import { useDateDropdown } from '../hooks/useDateDropdown'
import { DateDropdownProps } from '../types/DateDropdown.type'
import { SearchableDropdown } from './SearchableDropdown'
import style from '../style/DateDropdown.module.scss'

/**
 * Renders date dropdown component in the date format DD/MM/YYYY,
 * does not support localized formatting
 */
function DateDropdown({
  value,
  onChange,
  minYear,
  maxYear,
}: DateDropdownProps) {
  const {
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
  } = useDateDropdown({ value, minYear, maxYear, onChange })

  return (
    <section className={style['date-dropdown']}>
      <SearchableDropdown<string>
        options={dayOptions}
        value={day?.toString()}
        onChange={(val) => {
          const newDay = parseInt(val, 10)
          setDay(newDay)
          handleDateChange(newDay, undefined, undefined)
        }}
        placeholder="Day"
        searchPlaceholder="Search day..."
      />
      <SearchableDropdown<string>
        options={monthOptions}
        value={month?.toString()}
        onChange={(val) => {
          const newMonth = parseInt(val, 10)
          setMonth(newMonth)
          handleDateChange(undefined, newMonth, undefined)
        }}
        placeholder="Month"
        searchPlaceholder="Search month..."
      />

      <SearchableDropdown<string>
        options={yearOptions.sort(
          (a, b) => parseInt(b.value) - parseInt(a.value)
        )}
        value={year?.toString()}
        onChange={(val) => {
          const newYear = parseInt(val, 10)
          setYear(newYear)
          handleDateChange(undefined, undefined, newYear)
        }}
        placeholder="Year"
        searchPlaceholder="Search year..."
      />
    </section>
  )
}

export { DateDropdown }
