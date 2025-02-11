import { Card } from '../../common/components/Card'
import { NewsArticleProps } from './types/NewsArticles.type'
import style from './NewsArticle.module.scss'
import { timeAgo } from './utils'
import { IconAndElement } from '../../common/components/IconAndElement'
import { Image } from '../../common/components/Image'
import { getString } from '../../common/utils'

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
  const fallbackContent = getString('FALLBACK_FOR_ARTICLES')
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
            <Image
              src={imageUrl}
              alt={title}
              className={style['news-article__image']}
            />
          </div>

          <IconAndElement icon={'category'}>
            <p className={style['news-article__category']}>
              {category ?? fallbackContent}
            </p>
          </IconAndElement>
        </header>
        <article className={style['news-article__content']}>
          {description && (
            <p className={style['news-article__description']}>{description}</p>
          )}
          <footer className={style['news-article__footer']}>
            <IconAndElement icon={'source'}>
              <p className={style['news-article__source']}>
                {source ?? fallbackContent}
              </p>
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
              <p className={style['news-article__author']}>
                {author ?? fallbackContent}
              </p>
            </IconAndElement>
          </footer>
        </article>
      </div>
    </Card>
  )
}

export { NewsArticle }
