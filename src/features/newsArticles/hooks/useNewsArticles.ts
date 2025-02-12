import { ArticleQuery } from '../../../services/types/Query.types'
import { useAppDispatch, useAppSelector } from '../../../state/hooks'
import { articleFetchData } from '../newsArticleThunks'
import { filterBy, applyPersonalized } from '../newsArticlesSlice'
import { FilterPayload, Personalize } from '../types/NewsArticle.type'

/**
 * Used to interact with the newsArticles slice, abstracts some functionalities
 * for ease of use
 */
function useNewsArticles() {
  const data = useAppSelector((state) => state.newsArticles)
  const dispatch = useAppDispatch()

  function setQuery(query: Omit<ArticleQuery, 'apiKey'>) {
    return dispatch(
      articleFetchData({
        ...query,
        searchWord: query?.searchWord?.trim(),
      })
    )
  }

  function filterArticlesBy(params?: FilterPayload) {
    if (params) {
      const { key, value } = params
      dispatch(filterBy({ key, value }))
      return
    }
    dispatch(filterBy({}))
  }

  function personalizeFeed(params?: Personalize) {
    dispatch(applyPersonalized(params as void))
  }

  return {
    /**
     * Article data with all fetched articles
     */
    articles: data?.articles,
    /**
     * Current active filters in redux state
     */
    activeFilters: data?.activeFilters,
    /**
     * Calls the news APIS with the specified query
     */
    setQuery,
    /**
     * Allows filtering articles in the redux store, by passing a key to filter
     * and value. If nothing is provided it will reset the filter to initial state
     */
    filterArticlesBy,
    /**
     * Applies the personalized feed to the redux store
     */
    personalizeFeed,
    status: data.status,
    isLoading: data.status === 'loading',
    error: data.error,
    /**
     * Contains all the article values as array for the current feed `category`
     * has all the possible article categories `source` has all the possible
     * article sources `author` has all the possible article authors
     */
    articleMetaFilters: data?.articlesMetaFilters ?? {
      category: [],
      source: [],
      author: [],
    },
  }
}

export { useNewsArticles }
