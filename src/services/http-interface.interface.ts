type GetParams = {
  url: string
  config?: RequestConfig
}

interface HttpClient {
  get<T>({ url, config }: GetParams): Promise<T>
}

interface RequestConfig {
  baseURL?: string
  headers?: Record<string, string>
  params?: Record<string, string | number | boolean>
}

export type { RequestConfig, HttpClient, GetParams }
