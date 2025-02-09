import { PageLayoutProps } from '../types/PageLayout.type'

function PageLayout({ children }: PageLayoutProps) {
  return <main>{children}</main>
}

export { PageLayout }
