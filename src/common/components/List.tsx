import { ForwardedRef, forwardRef } from 'react'
import { ListProps } from '../types/List.type'

function ListComponent<T>(
  {
    items,
    renderItem,
    renderEmpty,
    getItemKey = (_, index) => index.toString(),
    ...containerProps
  }: ListProps<T>,
  ref: ForwardedRef<HTMLUListElement>
) {
  if (items && items?.length === 0) {
    return renderEmpty ? renderEmpty() : null
  }

  return (
    <ul
      {...containerProps}
      ref={ref}
      role="list"
      style={{
        margin: 0,
        padding: 0,
      }}
    >
      {items.map((item, index) => (
        <li
          key={getItemKey(item, index)}
          role="listitem"
          style={{
            listStyle: 'none',
          }}
        >
          {renderItem(item, index)}
        </li>
      ))}
    </ul>
  )
}

/**
 * Base component that renders list of items
 */
export const List = forwardRef(ListComponent)
