import {
  AggregatedArticle,
  UnifiedQuery,
} from './models/AggregatedArticles.model'
import { NewsOrgArticle } from './models/NewsOrg.model'
import { NyTimesArticle } from './models/NyTimes.model'
import { GuardianArticle } from './models/TheGuardian.model'
import {
  ArticleQuery,
  GuardianQuery,
  NewsOrgQuery,
  NyTimesQuery,
} from './types/Query.types'
import { SearchResult } from './types/Utils'

/**
 * Filters out undefined values and returns a new object
 */
function filterAndAssign<T extends Record<string, unknown>>(
  obj: T,
  entries: Iterable<[string, unknown]>
): T {
  if (!entries || !obj) {
    console.warn('No entries or object provided, returning empty object')
    return {} as T
  }

  Object.assign(
    obj,
    Object.fromEntries(Array.from(entries).filter(([, v]) => v !== undefined))
  )
  // Returns new object, so the original one is not mutated
  return { ...obj }
}

/**
 * Creates a specific query param used for the `NewsOrg` API
 * https://newsapi.org/docs
 */
function queryToNewsOrgParams({
  author,
  category,
  date,
  searchWord,
  apiKey,
}: ArticleQuery): NewsOrgQuery {
  try {
    const params: NewsOrgQuery = { apiKey }

    if (!apiKey) {
      throw new TypeError(
        'API key is required, for NewsOrg API, params cannot be processed'
      )
    }
    if (!searchWord) {
      throw new TypeError(
        'Search word is required, for NewsOrg API, params cannot be processed'
      )
    }

    const paramsMap = {
      q: searchWord,
      section: category,
      from: date,
      'q=author': author,
      sortBy: 'publishedAt',
    }

    return filterAndAssign(params, Object.entries(paramsMap))
  } catch (e) {
    console.error(e)
    return {} as NewsOrgQuery
  }
}

/**
 * Creates a specific query param used for the `TheGuardian` API
 * https://open-platform.theguardian.com/documentation/
 */
function queryToGuardianParams({
  author,
  category,
  date,
  searchWord,
  apiKey,
}: ArticleQuery): GuardianQuery {
  try {
    const params: GuardianQuery = { 'api-key': apiKey }

    if (!apiKey) {
      throw new TypeError(
        'API key is required, for Guardian API, params cannot be processed'
      )
    }

    const paramsMap = {
      section: category,
      reference: author ? `author/${author}` : undefined,
      q: searchWord,
      'order-by': 'relevance',
      from: date,
    }

    return filterAndAssign(params, Object.entries(paramsMap))
  } catch (e) {
    console.error(e)
    return {} as GuardianQuery
  }
}
/**
 * Creates a specific query param used for the `NyTimes` API
 * https://developer.nytimes.com/docs/articlesearch-product/1/routes/articlesearch.json/get
 */
function queryToNyTimesParams({
  author,
  category,
  date,
  searchWord,
  apiKey,
}: ArticleQuery): NyTimesQuery {
  try {
    const params: NyTimesQuery = { 'api-key': apiKey }

    if (!apiKey) {
      throw new TypeError(
        'API key is required, for NyTimes API, params cannot be processed'
      )
    }

    //FIXME: Not a good way to do this, but okay for now
    const fq =
      [author && `author:"${author}"`, category && `category:"${category}"`]
        .filter(Boolean)
        .join(' OR ') || undefined

    const paramsMap = {
      q: searchWord,
      begin_date: date,
      fq: fq,
    }

    return filterAndAssign(params, Object.entries(paramsMap))
  } catch (e) {
    console.error(e)
    return {} as NyTimesQuery
  }
}

/**
 * Unifies a generic query params and creates an object that has a property for
 * each API, and the property is an object params modified to fit each news API
 */
function unifyQuery({
  author,
  category,
  date,
  searchWord,
  apiKey,
}: ArticleQuery): UnifiedQuery {
  return {
    newsOrg: queryToNewsOrgParams({
      author,
      category,
      date,
      searchWord,
      apiKey,
    }),
    guardian: queryToGuardianParams({
      author,
      category,
      date,
      searchWord,
      apiKey,
    }),
    nyTimes: queryToNyTimesParams({
      author,
      category,
      date,
      searchWord,
      apiKey,
    }),
  }
}

/**
 * Returns the value of a deeply nested object, the max depth is 10, preset in
 * the function itself
 *
 * @note It only takes in a key, not a path. Does not handle nesting, returns
 * the first ever found value to the first key
 */
function findDeepValue<T>(obj: unknown, key: string): SearchResult<T> {
  const MAX_DEPTH = 10

  function search(
    currentObj: unknown,
    currentPath: Array<string>
  ): SearchResult<T> {
    if (currentPath.length > MAX_DEPTH) {
      return { found: false }
    }

    if (currentObj === null || typeof currentObj !== 'object') {
      return { found: false }
    }

    const typedObj = currentObj as Record<string, unknown>

    if (key in typedObj && typedObj[key] !== undefined) {
      return {
        found: true,
        value: typedObj[key] as T,
        path: [...currentPath, key],
      }
    }

    for (const k in typedObj) {
      if (typeof typedObj[k] === 'object' && typedObj[k] !== null) {
        const result = search(typedObj[k], [...currentPath, k])
        if (result.found) {
          return result
        }
      }
    }

    return { found: false }
  }

  return search(obj, [])
}

/**
 * Returns a nested value for a passed in object and the path
 */
function getNestedValue<T>(obj: T, path: string): unknown {
  // First check for direct property access (including keys with dots)
  if (Object.prototype.hasOwnProperty.call(obj, path)) {
    return (obj as Record<string, unknown>)[path]
  }

  // Then try nested access
  return path.split('.').reduce(
    (
      acc: Record<string, unknown> | undefined,
      part: string
    ): Record<string, unknown> | undefined => {
      if (acc === undefined || acc === null) {
        return undefined
      }
      return acc[part] as Record<string, unknown> | undefined
    },
    obj as Record<string, unknown>
  )
}

/**
 * Unifies objects by mapping fields from one object to another and returns a
 * new object with unified properties using the passed in `fieldMap`
 */
function unifyObjects<T>(
  objects: Array<T>,
  fieldMap: Record<keyof T, Array<string>>
): T[] {
  return objects.map((sourceObj) => {
    const unified = {} as Record<keyof T, unknown>

    ;(Object.entries(fieldMap) as [keyof T, Array<string>][]).forEach(
      ([targetKey, sourceKeys]) => {
        let value: unknown

        // Check source keys in priority order
        for (const sourceKey of sourceKeys) {
          value = getNestedValue(sourceObj, sourceKey)
          if (value !== undefined) break
        }

        unified[targetKey] = value
      }
    )

    return unified as T
  })
}

/**
 * Takes in an array of multiple articles from different sources and maps them
 * to a single object with the same keys
 */
function processArticlesAndAggregate(
  arrayOfArticles: Array<NyTimesArticle | GuardianArticle | NewsOrgArticle>
) {
  //TODO: Might want to put this as a config
  const propertyMap = {
    id: ['id', '_id', 'source.id'],
    title: ['title', 'webTitle', 'headline.main'],
    description: ['abstract', 'snippet', 'lead_paragraph'],
    url: ['webUrl', 'web_url', 'url'],
    //TODO: Multimedia url won't work, because NYT
    // does not send the full url they only send the PATH
    imageUrl: ['urlToImage', 'multimedia.url'],
    publishedAt: ['publishedAt', 'webPublicationDate', 'pub_date'],
    category: ['sectionId', 'section_name', 'sectionName'],
    author: ['author', 'byline.original'],
    content: ['content'],
    source: ['source.id', 'source.name', 'source'],
  }

  const unified = unifyObjects(arrayOfArticles, propertyMap)

  return [...unified] as unknown as Array<AggregatedArticle>
}

export {
  unifyQuery,
  findDeepValue,
  processArticlesAndAggregate,
  getNestedValue,
}
