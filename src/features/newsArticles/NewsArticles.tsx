import { List } from '../../common/components/List'
import { AggregatedArticle } from '../../services/models/AggregatedArticles.model'
import { NewsArticle } from './NewsArticle'
import { NewsArticlesProps } from './types/NewsArticles.type'
import style from './NewsArticles.module.scss'

function NewsArticles({ articles }: NewsArticlesProps) {
  return (
    <List
      className={style['news-articles']}
      id="news-articles"
      items={articles}
      renderItem={(item) => {
        const article = item as AggregatedArticle
        return <NewsArticle {...article} />
      }}
    />
  )
}

export { NewsArticles }
