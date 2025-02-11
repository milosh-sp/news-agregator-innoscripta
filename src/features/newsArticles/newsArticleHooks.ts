import { ArticleQuery } from '../../services/types/Query.types'
import { useAppDispatch, useAppSelector } from '../../state/hooks'
import { articleFetchData } from './newsArticleThunks'
import { filterBy } from './newsArticlesSlice'
import { FilterPayload } from './types/NewsArticle.type'

/**
 * Used to interact with the newsArticles slice, abstracts some functionalities
 * for ease of use
 */
function useNewsArticles() {
  const data = useAppSelector((state) => state.newsArticles)
  const dispatch = useAppDispatch()

  function setQuery(query: Omit<ArticleQuery, 'apiKey'>) {
    return dispatch(articleFetchData(query))
  }

  /**
   * Allows filtering articles in the redux store, by passing a key to filter
   * and value. If nothing is provided it will reset the filter to initial state
   */
  function filterArticlesBy(params?: FilterPayload) {
    if (params) {
      const { key, value } = params
      dispatch(filterBy({ key, value }))
      return
    }
    dispatch(filterBy({}))
  }

  return {
    articles: data?.articles,
    setQuery,
    filterArticlesBy,

    isLoading: data.status === 'loading',
    error: data.error,
    articleMetaFilters: data?.articlesMetaFilters ?? {
      category: [],
      source: [],
      author: [],
    },
  }
}

export { useNewsArticles }
