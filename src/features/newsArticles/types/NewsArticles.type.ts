import { CardBaseProps } from '../../../common/types/Card.type'

interface NewsArticleProps extends CardBaseProps {
  title?: string
  author?: string
  description?: string
  publishedAt?: string
  url?: string
  imageUrl?: string
  category?: string
  source?: string
}

type NewsArticles = Array<NewsArticleProps>

export type { NewsArticleProps, NewsArticles }
