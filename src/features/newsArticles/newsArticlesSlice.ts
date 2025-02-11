import { createSlice } from '@reduxjs/toolkit'
import { AggregatedArticle } from '../../services/models/AggregatedArticles.model'
import { ArticleQuery } from '../../services/types/Query.types'
import { filterByCategoryOrSource } from './newsArticlesReducers'
import { articleFetchData } from './newsArticleThunks'
import { FilterPayload } from './types/NewsArticle.type'
import {
  extractMetaFilters,
  getPersonalizedArticles,
  normalizeDataFromApi,
} from './utils'

const initialState = {
  status: 'idle',
  articles: [],
  initialArticles: [],
  error: null,
  activeFilters: {
    category: '',
    source: '',
  },
  articlesMetaFilters: {
    category: [],
    source: [],
    author: [],
  },
  query: {
    category: '',
    author: '',
    searchWord: '',
    date: '',
  },
} as {
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  articles: Array<AggregatedArticle>
  initialArticles: Array<AggregatedArticle>
  error: unknown
  activeFilters: {
    category: string
    source: string
  }
  query: Omit<ArticleQuery, 'apiKey'>
  articlesMetaFilters: {
    category: Array<string>
    source: Array<string>
    author: Array<string>
  }
}

/**
 * Handles the state of the newsArticles slice fetching articles and fetching
 * single article details
 */
const newsArticlesSlice = createSlice({
  name: 'newsArticles',
  initialState,
  reducers: {
    filterBy: (
      state,
      action: {
        payload: FilterPayload
      }
    ) => {
      if (!action.payload.value || !action.payload.key) {
        state.articles = state.initialArticles
        state.activeFilters = {
          category: '',
          source: '',
        }
        return
      }

      const filteredArticles = filterByCategoryOrSource(
        state.initialArticles,
        action.payload
      )

      if (typeof action.payload.value === 'string') {
        state.activeFilters = {
          ...state.activeFilters,
          [action.payload.key]: action.payload.value,
        }
      }

      state.articles = filteredArticles
    },
  },

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

          const preferenceArticles = getPersonalizedArticles(normalizedData)

          state.initialArticles = normalizedData.sort(
            (a, b) =>
              new Date(b.publishedAt).getTime() -
              new Date(a.publishedAt).getTime()
          )

          state.articles = (() => {
            if (preferenceArticles.length !== 0) {
              return preferenceArticles.sort(
                (a, b) =>
                  new Date(b.publishedAt).getTime() -
                  new Date(a.publishedAt).getTime()
              )
            }
            return state.initialArticles
          })()

          state.articlesMetaFilters = extractMetaFilters({
            elements: normalizedData,
            keys: Object.keys(initialState.articlesMetaFilters) as Array<
              keyof AggregatedArticle
            >,
          }) as typeof state.articlesMetaFilters

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
const { filterBy } = newsArticlesSlice.actions

export { articleFetchData, filterBy, newsArticlesReducer }
