type GuardianArticle = {
  id: string
  type: string
  sectionId: string
  sectionName: string
  webPublicationDate: string
  webTitle: string
  webUrl: string
  apiUrl: string
  isHosted: boolean
  pillarId: string
  pillarName: string
}

interface GuardianResponse {
  response: {
    status: 'ok'
    userTier: 'developer'
    total: number
    startIndex: number
    pageSize: number
    currentPage: number
    pages: number
    orderBy: 'newest' | 'oldest' | 'relevance'
  }
  results: Array<GuardianArticle>
}

export type { GuardianArticle, GuardianResponse }
