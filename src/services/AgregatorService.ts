import { NewsService } from './NewsService.interface'
import { endpoints } from './endpoints'
import { GetParams, HttpClient } from './http-interface.interface'

/**
 * Provides a unified interface for fetching articles from multiple sources
 */
export class AggregatorService implements NewsService {
  constructor(private httpClient: HttpClient) {}

  /**
   * Fetches articles from a source with given query params
   */
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

  //FIXME: Add T
  async getArticlesFromSources(sources: Array<GetParams>) {
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

  //TODO: Need to make params for the following TODO: Take in unified query
  //sources, categories, and authors.8 to search for articles by keyword and
  //filter the results by date, category, and source.8
  async getArticlesFromAllSources() {
    // Pass each param from the method, to it's own config
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
