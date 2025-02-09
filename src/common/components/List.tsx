import { ForwardedRef, forwardRef, HTMLAttributes, ReactNode } from 'react'

interface ListContainerProps extends HTMLAttributes<HTMLUListElement> {
  scrollable?: boolean
}

interface ListRenderProps<T> {
  items: Array<T>
  renderItem: (item: T, index: number) => ReactNode
  renderEmpty?: () => ReactNode
  getItemKey?: (item: T, index: number) => string
}

type ListProps<T> = ListContainerProps & ListRenderProps<T>

function ListComponent<T>(
  {
    items,
    renderItem,
    renderEmpty,
    // scrollable = true,
    getItemKey = (_, index) => index.toString(),
    // className = '',
    ...containerProps
  }: ListProps<T>,
  ref: ForwardedRef<HTMLUListElement>
) {
  if (items && items?.length === 0) {
    return renderEmpty ? renderEmpty() : null
  }

  return (
    <ul {...containerProps} ref={ref} role="list">
      {items.map((item, index) => (
        <li
          key={getItemKey(item, index)}
          role="listitem"
          className="list-item-wrapper"
        >
          {renderItem(item, index)}
        </li>
      ))}
    </ul>
  )
}

export const List = forwardRef(ListComponent)
