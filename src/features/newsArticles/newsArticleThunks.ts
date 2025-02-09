import { createAsyncThunk } from '@reduxjs/toolkit'
import { ArticleQuery } from '../../services/types/Query.types'
import { aggregatorService } from '../../services/services'

/**
 * Calls the aggregator service to fetch articles, with the specified query
 * params
 */
export const articleFetchData = createAsyncThunk(
  'news/articles',
  async (query: Omit<ArticleQuery, 'apiKey'>) =>
    aggregatorService.getArticlesFromAllSources(query)
)
