import { ErrorText } from '../common/components/ErrorText'
import { PageLayout } from '../common/components/PageLayout'
import { Spinner } from '../common/components/Spinner'
import { useNewsArticles } from '../features/newsArticles/hooks/useNewsArticles'
import { NewsArticles } from '../features/newsArticles/components/NewsArticles'
import { NewsArticleSearch } from '../features/newsArticles/components/NewsArticleSearch'
import { getString } from '../common/utils'
import { useEffect } from 'react'
import { CONSTS } from '../common/consts'
import { Button } from '../common/components/Button'

/**
 * Renders the main feed page, on render the whole feed is fetched
 */
function FeedPage() {
  const { articles, isLoading, error, status, setQuery } = useNewsArticles()

  useEffect(() => {
    //FIXME: In react dev more this will be called twice, need to cancel the
    //request not the promise returned from `setQuery`
    setQuery({
      searchWord: CONSTS.initialFeedQuery,
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const tryAgain = (
    <Button
      variant={'secondary'}
      //FIXME: Not debounced
      onClick={() => setQuery({ searchWord: CONSTS.initialFeedQuery })}
    >
      {getString('REFRESH_FEED')}
    </Button>
  )

  return (
    <PageLayout>
      <NewsArticleSearch />
      {isLoading && <Spinner />}
      {error ? (
        <>
          <ErrorText errorText={getString('GENERIC_ERROR')} />
          {tryAgain}
        </>
      ) : null}

      {!isLoading && !error && <NewsArticles articles={articles} />}
      {!error &&
        articles &&
        articles.length === 0 &&
        status === 'succeeded' && (
          <>
            <ErrorText errorText={getString('NO_ARTICLES_FOUND')} />
            {tryAgain}
          </>
        )}
    </PageLayout>
  )
}

export default FeedPage
