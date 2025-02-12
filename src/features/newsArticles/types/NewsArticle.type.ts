type FilterPayload = {
  key?: 'category' | 'source' | 'date' | 'author' | string
  value?: string | { from?: string; to?: string }
  skipActiveFilters?: boolean
}

type Personalize = {
  key?: 'reset'
}

interface DateRange {
  from?: string
  to?: string
}

interface DateFilterResult {
  isValid: boolean
  articleTimestamp: number
  rangeStart: number
  rangeEnd: number
}

export type { FilterPayload, DateRange, DateFilterResult, Personalize }
