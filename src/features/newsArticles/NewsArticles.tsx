import { List } from '../../common/components/List'
import { AggregatedArticle } from '../../services/models/AggregatedArticles.model'
import { NewsArticle } from './NewsArticle'
import { NewsArticlesProps } from './types/NewsArticles.type'

function NewsArticles({ articles }: NewsArticlesProps) {
  return (
    <section>
      <List
        id="news-articles"
        items={articles}
        renderItem={(item) => {
          const article = item as AggregatedArticle
          return <NewsArticle {...article} />
        }}
      />
    </section>
  )
}

export { NewsArticles }
