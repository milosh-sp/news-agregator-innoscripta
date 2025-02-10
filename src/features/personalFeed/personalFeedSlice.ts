import { createSlice } from '@reduxjs/toolkit'
import { Preference, PrefKeys } from './types/PersonalFeed.types'
import { loadUserPreferences, LocalStorage } from '../../common/utils'
import { CONSTS } from '../../common/consts'

const MAX_PREFERENCE_ENTRIES = 5

type Payload = {
  prefKey: PrefKeys
  prefValue: string
}

const initialPreferences: Preference = {
  categories: [],
  authors: [],
  sources: [],
}

const initialState = {
  preference: loadUserPreferences(initialPreferences),
} as {
  preference: Preference
}

const personalFeedSlice = createSlice({
  name: 'personalFeed',
  initialState,
  reducers: {
    setPreference: (
      state,
      action: {
        payload: Payload
      }
    ) => {
      if (action.payload?.prefKey && action.payload?.prefValue) {
        if (
          state.preference[action.payload.prefKey].length >=
          MAX_PREFERENCE_ENTRIES
        ) {
          console.warn(
            `Maximum allowed preferences per type is ${MAX_PREFERENCE_ENTRIES}`
          )
          return
        }

        const preference = state.preference[action.payload.prefKey]
        // if there is a preferences with that key and the value is not there
        // in order to avoid duplicates
        if (preference && !preference.includes(action.payload.prefValue)) {
          state.preference[action.payload.prefKey] = [
            ...preference,
            action.payload.prefValue,
          ]

          // persist the updated state
          LocalStorage.setItem(CONSTS.personalFeedKey, state.preference)
        }
      }
    },
    removePreference: (state, action: { payload: Payload }) => {
      const prefArray = state.preference[action.payload.prefKey]
      if (prefArray) {
        // no need to check if the value exists
        state.preference[action.payload.prefKey] = prefArray.filter(
          (item) => item !== action.payload.prefValue
        )
        // update local storage
        LocalStorage.setItem(CONSTS.personalFeedKey, state.preference)
      }
    },
    resetPresences: (state) => {
      // set to empty initial references
      state.preference = initialPreferences
      LocalStorage.removeItem(CONSTS.personalFeedKey)
    },
  },
})

const personalFeedReducer = personalFeedSlice.reducer
const { setPreference, removePreference, resetPresences } =
  personalFeedSlice.actions

export { personalFeedReducer, removePreference, resetPresences, setPreference }
