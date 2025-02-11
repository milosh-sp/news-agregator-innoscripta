import { createSlice } from '@reduxjs/toolkit'
import { AggregatedArticle } from '../../services/models/AggregatedArticles.model'
import { ArticleQuery } from '../../services/types/Query.types'
import { filterByCategoryOrSource } from './newsArticlesReducers'
import { articleFetchData } from './newsArticleThunks'
import { extractMetaFilters, normalizeDataFromApi } from './utils'
import { FilterPayload } from './types/NewsArticle.type'
import { LocalStorage } from '../../common/utils'
import { CONSTS } from '../../common/consts'
import { Preference } from '../personalFeed/types/PersonalFeed.types'

const initialState = {
  status: 'idle',
  articles: [],
  initialArticles: [],
  error: null,
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
        return
      }

      state.articles = filterByCategoryOrSource(state.articles, action.payload)
    },
    personalizeFeed: (state) => {
      let preferenceArticles = [] as typeof state.articles

      const preferences = LocalStorage.getItem(
        CONSTS.personalFeedKey
      ) as Preference

      Object.entries(preferences).forEach(([key, value]) => {
        value.forEach((v) => {
          preferenceArticles = [
            ...filterByCategoryOrSource(state.articles, {
              key,
              value: v,
            }),
          ]
        })
      })

      if (preferenceArticles.length > 1) {
        state.articles = [...preferenceArticles]
      }
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

          state.initialArticles = state.articles = normalizedData.sort(
            (a, b) =>
              new Date(b.publishedAt).getTime() -
              new Date(a.publishedAt).getTime()
          )

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
const { filterBy, personalizeFeed } = newsArticlesSlice.actions

export { articleFetchData, filterBy, newsArticlesReducer, personalizeFeed }
