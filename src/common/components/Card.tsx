import { CardBaseProps } from '../types/Card.type'

/**
 * Base card component used in other cards, can be used as standalone component
 * as well
 */
function Card({
  children,
  className,
  header,
  footer,
  headerClassName,
  footerClassName,
  ...rest
}: CardBaseProps) {
  return (
    <section {...rest} className={`${className}`}>
      {header && <header className={`${headerClassName}`}>{header}</header>}

      <article>{children}</article>

      {footer && <footer className={`${footerClassName}`}>{footer}</footer>}
    </section>
  )
}

export { Card }
