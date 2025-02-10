import { HTMLAttributes, ReactNode } from 'react'

interface ListContainerProps extends HTMLAttributes<HTMLUListElement> {
  scrollable?: boolean
}

interface ListRenderProps<T> {
  items: Array<T>
  renderItem: (item: T, index: number) => ReactNode
  renderEmpty?: () => ReactNode
  getItemKey?: (item: T, index: number) => string
  onClickItem?: () => void
}

type ListProps<T> = ListContainerProps & ListRenderProps<T>

export type { ListContainerProps, ListRenderProps, ListProps }
