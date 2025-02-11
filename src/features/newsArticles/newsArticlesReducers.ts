import { AggregatedArticle } from '../../services/models/AggregatedArticles.model'
import { FilterPayload } from './types/NewsArticle.type'

/**
 * Filters by category or source
 */
function filterByCategoryOrSource(
  articles: Array<AggregatedArticle>,
  { key, value }: FilterPayload
): Array<AggregatedArticle> {
  console.log(key, value)
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

    if (
      (key === 'category' || key === 'source' || key === 'author') &&
      typeof value === 'string'
    ) {
      return article[key]?.toLowerCase() === value.toLowerCase()
    }

    return false
  })
}

export { filterByCategoryOrSource }
