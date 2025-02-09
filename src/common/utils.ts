import { CONSTS } from './consts'

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

export { loadUserPreferences }

export { LocalStorage }
