/**
 * Generic query interface that is used to pass in unified
 * params to each API source
 */
type ArticleQuery = {
  category: string
  author: string
  searchWord: string
  date: string
}

type NewsOrgQuery = {
  q: string

  section: string
  'from-date': string
  'to-date': string

  'q=author': string
}
type GuardianQuery = {
  section: string
  reference: `author/${string}`
  q: string
  from: string
  to: string
}

type NyTimesFacetFields =
  | 'day_of_week'
  | 'document_type'
  | 'ingredients'
  | 'news_desk'
  | 'pub_month'
  | 'pub_year'
  | 'section_name'
  | 'source'
  | 'subsection_name'
  | 'type_of_material'

type NyTimesQuery = {
  begin_date?: string
  end_date?: string
  facet?: boolean
  facet_fields?: NyTimesFacetFields
  facet_filter?: boolean
  fl?: string
  fq?: string
  page?: number
  q?: string
  sort?: 'newest' | 'oldest' | 'relevance'
}

export type { ArticleQuery, NewsOrgQuery, GuardianQuery, NyTimesQuery }
