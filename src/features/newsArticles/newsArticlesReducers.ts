import { AggregatedArticle } from '../../services/models/AggregatedArticles.model'

/**
 * Filters by category or source
 */
function filterByCategoryOrSource(
  articles: Array<AggregatedArticle>,
  {
    key,
    value,
  }: {
    key?: 'category' | 'source' | 'date'
    value?: string | { from?: string; to?: string }
  }
): Array<AggregatedArticle> {
  if (!key || !value) {
    return []
  }

  return articles.filter((article) => {
    if (key === 'date' && typeof value === 'object' && value) {
      const articleDate = new Date(article.publishedAt).getTime()
      const fromTime = value?.from
        ? new Date(value?.from.trim()).getTime()
        : -Infinity
      const toTime = value?.to ? new Date(value?.to.trim()).getTime() : Infinity
      return articleDate >= fromTime && articleDate <= toTime
    }

    if ((key === 'category' || key === 'source') && typeof value === 'string') {
      return article[key]?.toLowerCase() === value.toLowerCase()
    }

    return false
  })
}

export { filterByCategoryOrSource }
