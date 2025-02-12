import { useAppSelector, useAppDispatch } from '../../../state/hooks'
import {
  removePreference,
  setPreference,
  resetPresences,
} from '../personalFeedSlice'
import { Preference, PrefKeys } from '../types/PersonalFeed.types'

/**
 * A hook to interact with the personal feed slice, allowing the user to set,
 * remove and reset their preferences.
 */
export function usePersonalFeed() {
  const data = useAppSelector((state) => state.personalFeed)
  const dispatch = useAppDispatch()

  /**
   * Allows the user to set, remove or reset their preferences.
   * Passing in `action` is mandatory
   */
  function setPersonalPreference({
    prefKey,
    prefValue,
    action,
  }: {
    prefKey?: PrefKeys
    prefValue?: string
    action: 'add' | 'remove' | 'reset'
  }) {
    if (prefKey && prefValue) {
      dispatch(
        action === 'remove'
          ? removePreference({ prefKey, prefValue: prefValue.toLowerCase() })
          : setPreference({ prefKey, prefValue: prefValue.toLowerCase() })
      )
      return
    }

    dispatch(resetPresences())
  }

  const prefsActive = (preference: Preference) =>
    Object.values(preference).some((prefArray) => prefArray.length > 0)

  return {
    preference: data.preference,
    setPersonalPreference,
    /**
     * Checks if the user has saved any kind of feed preference
     */
    isActivePrefs: prefsActive(data.preference),
  }
}
