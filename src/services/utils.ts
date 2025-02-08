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

//TODO: Add error handling

/**
 * Filters out undefined values and returns a new object
 */
const filterAndAssign = <T extends Record<string, unknown>>(
  obj: T,
  entries: Iterable<[string, unknown]>
): T => {
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

    const paramsMap = {
      q: searchWord,
      section: category,
      'from-date': date,
      'q=author': author,
    }

    return filterAndAssign(params, Object.entries(paramsMap))
  } catch (e) {
    console.error(e)
    return {} as NewsOrgQuery
  }
}

/**
 * Creates a specific query param used for the `TheGuardian` API
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

interface SearchResult<T> {
  found: boolean
  value?: T
  path?: string[]
}

function findDeepValue<T>(obj: unknown, key: string): SearchResult<T> {
  const MAX_DEPTH = 10

  function search(currentObj: unknown, currentPath: string[]): SearchResult<T> {
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

function processArticlesAndAggregate(
  arrayOfArticles: Array<NyTimesArticle | GuardianArticle | NewsOrgArticle>
) {
  const mapKey = {
    id: ['id', '_id'],
    title: ['title', 'webTitle', 'headline.main'],
    description: ['abstract', 'lead_paragraph'],
    url: ['webUrl', 'web_url'],
    imageUrl: ['urlToImage', 'multimedia.url'],
    publishedAt: ['publishedAt', 'webPublicationDate', 'pub_date'],
    category: ['sectionId', 'section_name'],
    author: ['author', 'original'],
  }

  let responseNewValue = {} as AggregatedArticle
  let arrayPer: Array<AggregatedArticle> = []

  // Take each response value which is an array of articles and map the
  // articles
  arrayOfArticles.forEach((article) => {
    // use the map key to find the json keys and values
    Object.entries(mapKey).forEach(([key, rawArticleKeys]) => {
      // construct if there if a value for that field a nice article
      rawArticleKeys.forEach((articleKey) => {
        const foundValue = findDeepValue(article, articleKey).value
        if (foundValue) {
          responseNewValue = {
            ...responseNewValue,
            [key]: foundValue,
          }

          arrayPer = [...arrayPer, responseNewValue]
        }
      })
    })
  })

  return [...arrayPer]
}

export { unifyQuery, findDeepValue, processArticlesAndAggregate }
