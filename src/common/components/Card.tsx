import { CardBaseProps } from '../types/Card.type'

/**
 * Base card component used in other cards, can be used as standalone component
 * as well
 */
function Card({ children, className, ...rest }: CardBaseProps) {
  return (
    <article {...rest} className={`${className}`}>
      {children}
    </article>
  )
}

export { Card }
