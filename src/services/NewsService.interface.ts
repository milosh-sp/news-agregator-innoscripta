import { GetParams } from './http-interface.interface'

/**
 * Defines the interfaces for a generic news service
 */
export interface NewsService {
  getArticlesFromSource<T>({ url, config }: GetParams): Promise<Array<T>>
  //FIXME: Add from Sources here
}
