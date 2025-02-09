import { configureStore } from '@reduxjs/toolkit'
import { newsArticlesReducer } from '../features/newsArticles/newsArticlesSlice'
import { personalFeedReducer } from '../features/personalFeed/personalFeedSlice'

export const store = configureStore({
  reducer: {
    newsArticles: newsArticlesReducer,
    personalFeed: personalFeedReducer,
  },
})

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store
// itself
type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch
type AppStore = typeof store

export type { RootState, AppDispatch, AppStore }
