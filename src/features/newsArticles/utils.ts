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

      if (value !== undefined && value !== null) {
        metaFilters = {
          ...metaFilters,
          [key]: Array.from(new Set([...(metaFilters?.[key] ?? []), value])),
        }
      }
    })
  })

  return metaFilters
}

export { extractMetaFilters, normalizeDataFromApi }
