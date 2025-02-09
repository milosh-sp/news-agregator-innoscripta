import { AggregatedArticle } from '../../services/models/AggregatedArticles.model'

/**
 * Filters by category or source
 */
function filterByCategoryOrSource(
  articles: Array<AggregatedArticle>,
  { key, value }: { key?: 'category' | 'source'; value?: string }
): Array<AggregatedArticle> {
  if (!key || !value) {
    return []
  }

  return articles.filter(
    (article) =>
      // typescript complains about this
      article[key]?.toLowerCase() === value.toLowerCase()
  )
}

export { filterByCategoryOrSource }
