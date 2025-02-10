import { List } from '../../common/components/List'
import { AggregatedArticle } from '../../services/models/AggregatedArticles.model'
import { NewsArticle } from './NewsArticle'

type NewsArticlesProps = {
  articles: Array<AggregatedArticle>
}

function NewsArticles({ articles }: NewsArticlesProps) {
  return (
    <section>
      <List
        id="news-articles"
        items={articles}
        renderItem={(item: AggregatedArticle) => {
          return <NewsArticle {...item} />
        }}
      />
    </section>
  )
}

export default NewsArticles
