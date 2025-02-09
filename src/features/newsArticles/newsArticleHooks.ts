import { ArticleQuery } from '../../services/types/Query.types'
import { useAppSelector, useAppDispatch } from '../../state/hooks'
import { articleFetchData } from './newsArticleThunks'

/**
 * Used to interact with the newsArticles slice, abstracts some functionalities
 * for ease of use
 */
function useNewsArticles() {
  const data = useAppSelector((state) => state.newsArticles)
  const dispatch = useAppDispatch()

  function setQuery(query: Omit<ArticleQuery, 'apiKey'>) {
    dispatch(articleFetchData(query))
  }

  return {
    articles: data.articles,
    setQuery,
    isLoading: data.status === 'loading',
    error: data.error,
  }
}

export { useNewsArticles }
