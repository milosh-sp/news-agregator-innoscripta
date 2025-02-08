interface SearchResult<T> {
  found: boolean
  value?: T
  path?: Array<string>
}

export type { SearchResult }
