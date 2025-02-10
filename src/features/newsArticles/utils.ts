import { AggregatedArticle } from '../../services/models/AggregatedArticles.model'

/**
 * Normalizes data to be array of objects from the `AggregatorService`
 */
function normalizeDataFromApi<T>(data: T) {
  if (!data) {
    throw new TypeError(`No params provided`)
  }

  const dataEntries = Object.entries(data)
  return dataEntries.reduce((acc: { [key: string]: unknown }[], [, value]) => {
    if (Array.isArray(value)) {
      return [
        ...acc,
        ...value.map((article: { [key: string]: unknown }) => ({
          ...article,
        })),
      ]
    } else {
      throw new Error('Expected value to be an array')
    }
  }, [])
}

/**
 * Extracts values from passed in keys
 */
function extractMetaFilters({
  elements,
  keys,
}: {
  elements: Array<AggregatedArticle>
  keys: Array<keyof AggregatedArticle>
}) {
  let metaFilters: { [key in keyof AggregatedArticle]?: string[] } = {}

  elements.forEach((article) => {
    keys.forEach((key) => {
      const value = article[key]?.toLowerCase()

      if (value) {
        metaFilters = {
          ...metaFilters,
          [key]: Array.from(new Set([...(metaFilters?.[key] ?? []), value])),
        }
      }
    })
  })

  return metaFilters
}

function timeAgo(date: Date): string {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()

  // Handle future dates and very recent past
  if (diffMs < 0) return 'just now'
  if (diffMs < 1000) return 'just now'

  // Calculate time components
  const seconds = Math.floor(diffMs / 1000)
  if (seconds < 60) {
    return `${seconds} second${seconds !== 1 ? 's' : ''} ago`
  }

  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) {
    return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`
  }

  const hours = Math.floor(minutes / 60)
  if (hours < 24) {
    return `${hours} hour${hours !== 1 ? 's' : ''} ago`
  }

  const days = Math.floor(hours / 24)
  if (days < 30) {
    return `${days} day${days !== 1 ? 's' : ''} ago`
  }

  const months = Math.floor(days / 30)
  if (months < 12) {
    return `${months} month${months !== 1 ? 's' : ''} ago`
  }

  const years = Math.floor(months / 12)
  return `${years} year${years !== 1 ? 's' : ''} ago`
}

export { extractMetaFilters, normalizeDataFromApi, timeAgo }
