import { PageLayoutProps } from '../types/PageLayout.type'
import style from '../style/PageLayout.module.scss'

/**
 * Page layout component renders elements in a column, using display flex
 */
function PageLayout({ children }: PageLayoutProps) {
  return <main className={style['page-layout']}>{children}</main>
}

export { PageLayout }
