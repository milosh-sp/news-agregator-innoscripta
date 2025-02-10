import { SelectionTokensProps } from '../types/SelectionTokens.types'
import { List } from './List'
import { TokenItem } from './TokenItem'

/**
 * Renders a list of tokens that can be removed and added
 */
function SelectionTokens({
  values = [],
  onChange,
  ...props
}: SelectionTokensProps) {
  return (
    <section {...props}>
      <List
        items={values}
        renderItem={(value) => (
          <TokenItem value={value as string} onChange={onChange} />
        )}
      />
    </section>
  )
}

export { SelectionTokens }
