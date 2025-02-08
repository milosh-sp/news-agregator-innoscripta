import { endpoints } from './endpoints'
import { IAggregatorService } from './interfaces/AggregatorService.interface'
import { GetParams, HttpClient } from './interfaces/HttpInterface'
import {
  AggregatedArticles,
  UnifiedQuery,
} from './models/AggregatedArticles.model'
import { NewsOrgArticle, NewsOrgResponse } from './models/NewsOrg.model'
import { NyTimesArticle, NyTimesResponse } from './models/NyTimes.model'
import { GuardianArticle, GuardianResponse } from './models/TheGuardian.model'
import { ArticleQuery } from './types/Query.types'
import { findDeepValue, processArticlesAndAggregate, unifyQuery } from './utils'

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
    try {
      const endpointEntries = Object.entries(endpoints)

      const requests = endpointEntries.map(([key, value]) => {
        const unifiedParams = unifyQuery({
          category,
          author,
          searchWord,
          date,
          apiKey: value?.apiKey,
        })?.[key as keyof UnifiedQuery]

        return {
          key,
          url: value?.url,
          config: {
            params: unifiedParams,
          },
          responseKey: value?.responseKey,
        }
      })

      const responses = (await Promise.allSettled(
        requests.map(({ url, config }) =>
          this.getArticlesFromSource({ url, config })
        )
      )) as Array<
        PromiseSettledResult<
          NewsOrgResponse | GuardianResponse | NyTimesResponse
        >
      >

      // Process the response
      const aggregatedArticles = requests.reduce(
        (acc, { key, responseKey }, index) => {
          const response = responses[index]

          if (response.status === 'fulfilled') {
            // Find the JSON keys that match the responseKey, which is tge actual
            // articles
            const arrayOfArticles = findDeepValue(response.value, responseKey)
              .value as Array<NyTimesArticle | GuardianArticle | NewsOrgArticle>

            if (!arrayOfArticles) {
              return {} as AggregatedArticles
            }

            // Processed article data is assigned
            acc[key] = processArticlesAndAggregate(arrayOfArticles)
          }

          return acc
        },
        {} as AggregatedArticles
      )

      return aggregatedArticles
    } catch (error) {
      console.error('Error fetching articles:', error)
      //TODO: This might not be such a good idea to do, because if this
      // function fails, it will return an empty object which cannot be accessed
      return {} as AggregatedArticles
    }
  }
}
