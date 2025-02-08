type NewsOrgArticle = {
  source: {
    id: string
    name: string
  }
  author: string
  title: string
  description: string
  url: string
  urlToImage: string
  publishedAt: string
  content: string
}

interface NewsOrgResponse {
  status: 'ok'
  totalResults: number
  articles: Array<NewsOrgArticle>
}

export type { NewsOrgArticle, NewsOrgResponse }
