type FilterPayload = {
  key?: 'category' | 'source' | 'date' | 'author' | string
  value?: string | { from?: string; to?: string }
}

export type { FilterPayload }
