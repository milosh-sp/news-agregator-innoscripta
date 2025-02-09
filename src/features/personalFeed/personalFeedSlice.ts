import { createSlice } from '@reduxjs/toolkit'
import { Preference, PrefKeys } from './types/PersonalFeed.types'

const MAX_PREFERENCE_ENTRIES = 20

type Payload = {
  prefKey: PrefKeys
  prefValue: string
}

const initialState = {
  preference: {
    categories: [],
    authors: [],
    sources: [],
  },
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
          state.preference[action.payload.prefKey].length >
          MAX_PREFERENCE_ENTRIES
        ) {
          console.warn('Maximum allowed preferences per type is 20')
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
      }
    },
    resetPresences: (state) => {
      state.preference = initialState.preference
    },
  },
})

const personalFeedReducer = personalFeedSlice.reducer
const { setPreference, removePreference, resetPresences } =
  personalFeedSlice.actions

export { personalFeedReducer, removePreference, resetPresences, setPreference }
