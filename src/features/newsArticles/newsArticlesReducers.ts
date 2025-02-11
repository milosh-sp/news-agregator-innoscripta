import { AggregatedArticle } from '../../services/models/AggregatedArticles.model'
import { FilterPayload } from './types/NewsArticle.type'
import { filterByDate } from './utils'

function filterArticles(
  articles: Array<AggregatedArticle>,
  filters: FilterPayload
): Array<AggregatedArticle> {
  // If no filters object exists, return all articles
  if (!filters || typeof filters !== 'object') {
    return articles
  }

  // Check if we have either key or value properties
  const hasKey = 'key' in filters && filters.key !== undefined
  const hasValue = 'value' in filters && filters.value !== undefined

  // Return all articles if neither key nor value exists
  if (!hasKey || !hasValue) {
    return articles
  }

  // Get the specific key and value
  const { key, value } = filters

  return articles.filter((article) => {
    // Handle date filtering
    if (key === 'date' && value && typeof value === 'object') {
      return filterByDate(article, key, value)
    }

    // Handle category, source, and author filtering
    if (
      key &&
      ['category', 'source', 'author'].includes(key) &&
      typeof value === 'string'
    ) {
      const articleValue =
        article[key as keyof AggregatedArticle]?.toLowerCase() || ''
      return articleValue === value.toLowerCase()
    }

    // Handle unknown keys
    return true
  })
}

export { filterArticles }
