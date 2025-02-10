import { SelectionTokensProps } from '../types/SelectionTokens.types'
import { List } from './List'
import { TokenItem } from './TokenItem'
import style from './SelectionTokens.module.scss'

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
        className={style['selection-tokens']}
        items={values}
        renderItem={(value) => (
          <TokenItem value={value as string} onChange={onChange} />
        )}
      />
    </section>
  )
}

export { SelectionTokens }
