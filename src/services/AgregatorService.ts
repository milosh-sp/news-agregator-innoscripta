import { IAggregatorService } from './interfaces/AggregatorService.interface'
import { endpoints } from './endpoints'
import { GetParams, HttpClient } from './interfaces/HttpInterface'
import {
  AggregatedArticles,
  UnifiedQuery,
} from './models/AggregatedArticles.model'
import { ArticleQuery } from './types/Query.types'
import { unifyQuery } from './utils'

export class AggregatorService implements IAggregatorService {
  constructor(private httpClient: HttpClient) {}

  async getArticlesFromSource<T>({ url, config }: GetParams) {
    try {
      const data = await this.httpClient.get<T>({
        url,
        config,
      })
      return data
    } catch (error) {
      console.error('Error fetching articles:', error)
      return []
    }
  }

  async getArticlesFromSources<T>(
    sources: Array<GetParams>
  ): Promise<PromiseSettledResult<T | unknown>[]> {
    try {
      const articles = await Promise.allSettled(
        sources.map(({ url, config }) =>
          this.getArticlesFromSource({ url, config })
        )
      )
      return articles
    } catch (error) {
      console.error('Error fetching articles:', error)
      return []
    }
  }

  async getArticlesFromAllSources({
    category,
    author,
    searchWord,
    date,
  }: Omit<ArticleQuery, 'apiKey'>) {
    const request = Object.entries(endpoints).map(([key, value]) => {
      const unifiedParams = unifyQuery({
        category,
        author,
        searchWord,
        date,
        apiKey: value?.apiKey,
      })?.[key as keyof UnifiedQuery]

      return {
        url: value?.url,
        config: {
          params: unifiedParams,
        },
      }
    })

    const articles = await this.getArticlesFromSources(request)

    console.log(articles)

    return {} as unknown as AggregatedArticles
  }
}
