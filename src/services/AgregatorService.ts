import { IAggregatorService } from './interfaces/AggregatorService.interface'
import { endpoints } from './endpoints'
import { GetParams, HttpClient } from './interfaces/HttpInterface'

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

  async getArticlesFromAllSources() {
    //TODO: Pass each param from the method, to it's own config
    return this.getArticlesFromSources([
      {
        url: endpoints.newsOrg,
        config: {
          params: {
            //TODO: Use env
            apiKey: 'KEY',
          },
        },
      },
      {
        url: endpoints.guardian,
        config: {
          params: {
            //TODO: Use env
            'api-key': 'KEY',
          },
        },
      },
    ])
  }
}
