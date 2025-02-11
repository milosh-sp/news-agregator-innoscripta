type GetParams = {
  url: string
  config?: RequestConfig
}
interface RequestConfig {
  baseURL?: string
  headers?: Record<string, string>
  params?: Record<string, string | number | boolean>
  timeout?: number
  signal?: AbortSignal
}

/**
 * Generic http client interface
 */
interface HttpClient {
  get<T>({ url, config }: GetParams): Promise<T>
}

export type { RequestConfig, HttpClient, GetParams }
