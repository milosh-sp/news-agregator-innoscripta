import { useAppDispatch, useAppSelector } from '../../state/hooks'
import {
  removePreference,
  resetPresences,
  setPreference,
} from './personalFeedSlice'
import { PrefKeys } from './types/PersonalFeed.types'

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
          ? removePreference({ prefKey, prefValue })
          : setPreference({ prefKey, prefValue })
      )
      return
    }

    dispatch(resetPresences())
  }

  return {
    preference: data.preference,
    setPersonalPreference,
  }
}
