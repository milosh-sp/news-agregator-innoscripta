import { AggregatedArticles } from '../models/AggregatedArticles.model'
import { ArticleQuery } from '../types/Query.types'
import { GetParams } from './HttpInterface'

/**
 * Provides a unified interface for fetching articles from multiple sources
 */
export abstract class IAggregatorService {
  /**
   * Fetches articles from a source with given query params
   */
  abstract getArticlesFromSource<T>({
    url,
    config,
  }: GetParams): Promise<Array<T>>

  /**
   * Fetches articles from multiple sources by making a parallel request using
   * `Promise.allSettled`
   */
  abstract getArticlesFromSources<T>(
    sources: Array<GetParams>
  ): Promise<PromiseSettledResult<T | unknown>[]>

  /**
   * Maps query params to each source and fetches articles from all sources,
   * using `Promise.allSettled`, the response is an JSON with a key for each
   * source, with array of flat JSON articles
   */
  abstract getArticlesFromAllSources({
    category,
    author,
    searchWord,
    date,
  }: ArticleQuery): Promise<AggregatedArticles>
}
