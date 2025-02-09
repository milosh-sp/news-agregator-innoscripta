import { HTMLAttributes, ReactNode } from 'react'

interface CardBaseProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode
  header?: ReactNode
  footer?: ReactNode
  headerClassName?: string
  footerClassName?: string
}

export type { CardBaseProps }
