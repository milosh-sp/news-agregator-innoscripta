import { ErrorText } from '../common/components/ErrorText'
import { PageLayout } from '../common/components/PageLayout'
import { Spinner } from '../common/components/Spinner'
import { useNewsArticles } from '../features/newsArticles/newsArticleHooks'
import { NewsArticles } from '../features/newsArticles/NewsArticles'
import { NewsArticleSearch } from '../features/newsArticles/NewsArticleSearch'
import { getString } from '../common/utils'
import { useEffect } from 'react'
import { CONSTS } from '../common/consts'

function FeedPage() {
  const { articles, isLoading, error, status, setQuery } = useNewsArticles()

  useEffect(() => {
    setQuery({
      searchWord: CONSTS.initialFeedQuery,
    })
    //FIXME: In react dev more this will be called twice, need to cancel the
    //request not the promise returned from `setQuery`
  }, [])

  return (
    <PageLayout>
      <NewsArticleSearch />
      {isLoading && <Spinner />}
      {error ? <ErrorText errorText={getString('GENERIC_ERROR')} /> : null}

      {!isLoading && !error && <NewsArticles articles={articles} />}
      {!error &&
        articles &&
        articles.length === 0 &&
        status === 'succeeded' && <p>{getString('NO_ARTICLES_FOUND')}</p>}
    </PageLayout>
  )
}

export default FeedPage
