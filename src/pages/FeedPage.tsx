import { ErrorText } from '../common/components/ErrorText'
import { PageLayout } from '../common/components/PageLayout'
import { Spinner } from '../common/components/Spinner'
import { useNewsArticles } from '../features/newsArticles/newsArticleHooks'
import { NewsArticles } from '../features/newsArticles/NewsArticles'
import { NewsArticleSearch } from '../features/newsArticles/NewsArticleSearch'
import { getString } from '../common/utils'

function FeedPage() {
  const { articles, isLoading, error } = useNewsArticles()

  return (
    <PageLayout>
      <NewsArticleSearch />
      {isLoading && <Spinner />}
      {error ? <ErrorText errorText={getString('GENERIC_ERROR')} /> : null}

      {!isLoading && !error && <NewsArticles articles={articles} />}
    </PageLayout>
  )
}

export default FeedPage
