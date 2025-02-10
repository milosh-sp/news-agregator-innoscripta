import { Card } from '../../common/components/Card'
import { NewsArticleProps } from './types/NewsArticles.type'

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
      onClick={() => window.open(url, '_blank', 'noopener')}
    >
      <header>
        <h2>{title}</h2>
        <img src={imageUrl} alt={title} />
        <p>{source}</p>
        <time dateTime={publishedAt}>{publishedAt}</time>
      </header>
      <article>
        <p>{description}</p>
        <p>{category}</p>
      </article>
      <footer>
        <span>{author}</span>
      </footer>
    </Card>
  )
}

export { NewsArticle }
