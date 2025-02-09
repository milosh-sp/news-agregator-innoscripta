import { createSlice } from '@reduxjs/toolkit'
import { articleFetchData } from './newsArticleThunks'
import { ArticleQuery } from '../../services/types/Query.types'
import { AggregatedArticle } from '../../services/models/AggregatedArticles.model'
import { normalizeDataFromApi } from './utils'

const initialState = {
  status: 'idle',
  articles: [],
  error: null,
  query: {
    category: '',
    author: '',
    searchWord: '',
    date: '',
  },
} as {
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  articles: Array<AggregatedArticle>
  error: unknown
  query: Omit<ArticleQuery, 'apiKey'>
}

/**
 * Handles the state of the newsArticles slice fetching articles and fetching
 * single article details
 */
const newsArticlesSlice = createSlice({
  name: 'newsArticles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(articleFetchData.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(articleFetchData.fulfilled, (state, action) => {
        try {
          if (!action.payload)
            throw new Error(
              'Fatal error, did not get any payload from services'
            )
          const normalizedData = normalizeDataFromApi(
            action.payload
          ) as unknown as Array<AggregatedArticle>

          state.articles = normalizedData.sort(
            (a, b) =>
              new Date(b.publishedAt).getTime() -
              new Date(a.publishedAt).getTime()
          )

          state.status = 'succeeded'
        } catch (error) {
          console.error(error)
          state.status = 'failed'
          state.error = error
        }
      })
      .addCase(articleFetchData.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error
      })
  },
})

const newsArticlesReducer = newsArticlesSlice.reducer
export { newsArticlesReducer, articleFetchData }
