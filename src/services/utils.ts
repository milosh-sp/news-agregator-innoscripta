import { UnifiedQuery } from './models/AggregatedArticles.model'
import {
  ArticleQuery,
  GuardianQuery,
  NewsOrgQuery,
  NyTimesQuery,
} from './types/Query.types'

//TODO: Add error handling

function queryToNewsOrgParams({
  author,
  category,
  date,
  searchWord,
  apiKey,
}: ArticleQuery): NewsOrgQuery {
  return {
    q: searchWord,
    section: category,
    'from-date': date,
    'q=author': author,
    apiKey,
  }
}

function queryToGuardianParams({
  author,
  category,
  date,
  searchWord,
  apiKey,
}: ArticleQuery): GuardianQuery {
  return {
    section: category,
    reference: `author/${author}`,
    q: searchWord,
    from: date,
    'api-key': apiKey,
  }
}

function queryToNyTimesParams({
  author,
  category,
  date,
  searchWord,
  apiKey,
}: ArticleQuery): NyTimesQuery {
  return {
    q: searchWord,
    begin_date: date,
    'api-key': apiKey,
    fq: `author:"${author}" OR category:"${category}"`,
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
