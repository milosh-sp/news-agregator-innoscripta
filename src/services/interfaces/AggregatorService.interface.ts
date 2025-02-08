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
   * Use all the queries to fetch articles from all sources
   */
  abstract getArticlesFromAllSources({
    category,
    author,
    searchWord,
    date,
  }: ArticleQuery): Promise<Array<unknown>>
}
