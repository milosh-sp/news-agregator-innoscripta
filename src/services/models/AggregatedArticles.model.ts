import { NewsOrgQuery, GuardianQuery, NyTimesQuery } from '../types/Query.types'

interface AggregatedArticle {
  id: string
  title: string
  description: string
  url: string
  imageUrl: string | null
  publishedAt: string
}

interface AggregatedArticles {
  [key: string]: Array<AggregatedArticle>
  nyTimes: Array<AggregatedArticle>
  newsOrg: Array<AggregatedArticle>
  guardian: Array<AggregatedArticle>
}

interface UnifiedQuery {
  newsOrg: NewsOrgQuery
  guardian: GuardianQuery
  nyTimes: NyTimesQuery
}
export type { AggregatedArticle, AggregatedArticles, UnifiedQuery }
