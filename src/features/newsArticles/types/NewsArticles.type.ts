import { CardBaseProps } from '../../../common/types/Card.type'
import { AggregatedArticle } from '../../../services/models/AggregatedArticles.model'

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

type NewsArticlesProps = {
  articles: Array<AggregatedArticle>
}

export type { NewsArticleProps, NewsArticles, NewsArticlesProps }
