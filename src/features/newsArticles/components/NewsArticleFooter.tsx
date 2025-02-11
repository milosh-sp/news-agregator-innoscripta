import { IconAndElement } from '../../../common/components/IconAndElement'
import { timeAgo } from '../utils'
import style from '../style/NewsArticle.module.scss'
import { NewsArticleFooterProps } from '../types/NewsArticles.type'

/**
 * Renders news article footer with source, date and author
 */
function NewsArticleFooter({
  publishedAt,
  author,
  source,
  fallbackContent,
}: NewsArticleFooterProps) {
  return (
    <footer className={style['news-article__footer']}>
      <IconAndElement icon={'source'}>
        <p className={style['news-article__source']}>
          {source ?? fallbackContent}
        </p>
      </IconAndElement>
      <IconAndElement icon={'date'}>
        <time dateTime={publishedAt} className={style['news-article__date']}>
          {publishedAt && timeAgo(new Date(publishedAt))}
        </time>
      </IconAndElement>
      <IconAndElement icon={'author'}>
        <p className={style['news-article__author']}>
          {author ?? fallbackContent}
        </p>
      </IconAndElement>
    </footer>
  )
}

export { NewsArticleFooter }
