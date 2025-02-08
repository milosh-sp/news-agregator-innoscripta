import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {},
})

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store
// itself
type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch
type AppStore = typeof store

export type { RootState, AppDispatch, AppStore }
