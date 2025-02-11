import { Card } from '../../../common/components/Card'
import { getString } from '../../../common/utils'
import { NewsArticleFooter } from './NewsArticleFooter'
import { NewsArticleHeader } from './NewsArticleHeader'
import style from '../style/NewsArticle.module.scss'
import { NewsArticleProps } from '../types/NewsArticles.type'

/**
 * Renders an article component
 */
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
      onClick={() => window.open(url, '_blank', 'noopener noreferrer')}
    >
      <div className={style['news-article__wrapper']}>
        <NewsArticleHeader
          title={title}
          imageUrl={imageUrl}
          category={category}
          fallbackContent={fallbackContent}
        />
        <article className={style['news-article__content']}>
          {description && (
            <p className={style['news-article__description']}>{description}</p>
          )}
          <NewsArticleFooter
            publishedAt={publishedAt}
            author={author}
            source={source}
            fallbackContent={fallbackContent}
          />
        </article>
      </div>
    </Card>
  )
}

export { NewsArticle }
