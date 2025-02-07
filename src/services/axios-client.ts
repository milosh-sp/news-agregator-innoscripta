import axios from 'axios'
import { HttpClient, RequestConfig } from './http-interface.interface'

export class AxiosHttpClient implements HttpClient {
  async get<T = unknown>({
    url,
    config,
  }: {
    url: string
    config?: RequestConfig
  }): Promise<T> {
    const response = await axios.get<T>(url, config)
    return response.data
  }
}
