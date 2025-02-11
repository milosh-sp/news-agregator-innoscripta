import { CONSTS } from './consts'
import strings from '../common/strings.json'

/**
 * Safer way to interact with LocalStorage, has error handling and warnings if
 * methods are improperly used
 */
class LocalStorage {
  /**
   * Sets the value in the local storage by stringify
   */
  static setItem<T>(key: string, value: T): void {
    if (key) {
      try {
        if (value && value) {
          localStorage.setItem(key, JSON.stringify(value))
        } else {
          console.warn(`No value provided to setItem for key: ${key}`)
        }
      } catch (error) {
        console.error(error)
      }
    } else {
      console.warn('No key provided to setItem')
    }
  }

  /**
   * Retrieves the item from local storage
   */
  static getItem<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key)
      if (item === null) {
        return null
      }
      return JSON.parse(item) as T
    } catch (error) {
      console.error(error)
      return null
    }
  }

  /**
   * Removes the item from local storage
   */
  static removeItem(key: string): void {
    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.error(error)
    }
  }
}

/**
 * Loads preferences from `localStorage` if found otherwise returns passed in
 * argument, if no default value is passed in empty object is returned
 */
function loadUserPreferences<T>(defaultValue: T) {
  try {
    if (!defaultValue) {
      throw new TypeError('Required param not provided, needs default value')
    }

    if (LocalStorage.getItem(CONSTS.personalFeedKey)) {
      return LocalStorage.getItem(CONSTS.personalFeedKey) as T
    }

    return defaultValue
  } catch (error) {
    console.error(error)
    return {}
  }
}

/**
 * Returns the number of days in a given month
 */
const getDaysInMonth = (month: number, year: number) => {
  return new Date(year, month, 0).getDate()
}

/**
 * Given a day, month, and year, returns a valid Date object if they can form a
 * valid date. Otherwise, returns null.
 *
 * If the given day is greater than the number of days in the given month, the
 * day is adjusted to the last day of the month.
 */
function createValidDate({
  day,
  month,
  year,
}: {
  day: number | undefined
  month: number | undefined
  year: number | undefined
}): Date | null {
  if (!day || !month || !year) return null

  const daysInMonth = getDaysInMonth(month, year)
  const adjustedDay = day > daysInMonth ? daysInMonth : day
  try {
    const date = new Date(year, month - 1, adjustedDay)
    return date
  } catch {
    return null
  }
}

/**
 * Returns an UI string used for localization, atm only `strings` is supported
 */
function getString(key: keyof typeof strings): string {
  try {
    const value = strings[key]
    if (typeof value === 'string') {
      return value
    }
    throw new Error(`Key "${key}" does not map to a string value.`)
  } catch (error) {
    console.error(error)
    return ''
  }
}

export {
  LocalStorage,
  loadUserPreferences,
  createValidDate,
  getDaysInMonth,
  getString,
}
