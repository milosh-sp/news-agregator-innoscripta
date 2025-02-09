import { Card, CardBaseProps } from '../../common/components/Card'

interface ArticleCardProps extends CardBaseProps {
  title: string
  content: string
  author: string
  description: string
  date: string
  url: string
  urlImage: string
  category: string
  source: string
}

function ArticleCard({
  title,
  content,
  author,
  date,
  ...rest
}: ArticleCardProps) {
  return (
    <Card {...rest} role="article">
      <header>
        <h2>{title}</h2>
        <time dateTime={date}>{''}</time>
      </header>
      <article>
        <p>{content}</p>
      </article>
      <footer>
        <span>{author}</span>
      </footer>
    </Card>
  )
}

export { ArticleCard }
