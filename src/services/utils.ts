import { UnifiedQuery } from './models/AggregatedArticles.model'
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

export { unifyQuery }
