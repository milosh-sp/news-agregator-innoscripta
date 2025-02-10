import { ApiCount } from '../common/components/ApiCount'
import { ErrorText } from '../common/components/ErrorText'
import { PageLayout } from '../common/components/PageLayout'
import { Spinner } from '../common/components/Spinner'
import { NewsArticleFilters } from '../features/newsArticles/NewsArticleFilters'
import { useNewsArticles } from '../features/newsArticles/newsArticleHooks'
import { NewsArticles } from '../features/newsArticles/NewsArticles'
import { NewsArticleSearch } from '../features/newsArticles/NewsArticleSearch'
import { PersonalPreferences } from '../features/personalFeed/PersonalPreferences'

function FeedPage() {
  const { articles, isLoading, error } = useNewsArticles()

  return (
    <>
      <PageLayout>
        <ApiCount />
        <PersonalPreferences />
        <NewsArticleSearch />
        {articles?.length > 0 && <NewsArticleFilters />}
        {isLoading && <Spinner />}
        {error ? <ErrorText /> : null}

        {!isLoading && !error && <NewsArticles articles={articles} />}
      </PageLayout>
    </>
  )
}

export default FeedPage
