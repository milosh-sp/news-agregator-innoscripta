import { Card } from '../../common/components/Card'
import { NewsArticleProps } from './types/NewsArticles.type'
import style from './NewsArticle.module.scss'
import { timeAgo } from './utils'
import { IconAndElement } from '../../common/components/IconAndElement'

function NewsArticle({
  title,
  author,
  description,
  publishedAt,
  url,
  imageUrl,
  category,
  source,
  ...rest
}: NewsArticleProps) {
  return (
    <Card
      {...rest}
      role="article"
      className={style['news-article']}
      onClick={() => window.open(url, '_blank', 'noopener')}
    >
      <div className={style['news-article__wrapper']}>
        <header className={style['news-article__header']}>
          <div className={style['news-article__img-title']}>
            <h2 className={style['news-article__title']}>{title}</h2>
            <img
              src={imageUrl}
              alt={title}
              className={style['news-article__image']}
            />
          </div>
          <p className={style['news-article__category']}>{category}</p>
        </header>
        <article className={style['news-article__content']}>
          {description && (
            <p className={style['news-article__description']}>{description}</p>
          )}
          <footer className={style['news-article__footer']}>
            <IconAndElement icon={'source'}>
              <p className={style['news-article__source']}>{source}</p>
            </IconAndElement>
            <IconAndElement icon={'date'}>
              <time
                dateTime={publishedAt}
                className={style['news-article__date']}
              >
                {publishedAt && timeAgo(new Date(publishedAt))}
              </time>
            </IconAndElement>
            <IconAndElement icon={'author'}>
              <p className={style['news-article__author']}>{author}</p>
            </IconAndElement>
          </footer>
        </article>
      </div>
    </Card>
  )
}

export { NewsArticle }
