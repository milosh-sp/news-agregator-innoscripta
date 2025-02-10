import { TokenItemProps } from '../types/TokenItem.type'

/**
 * Token item component, returns a value `onChange`
 */
function TokenItem({ value, onChange }: TokenItemProps) {
  return (
    <article>
      <span key={value}>{value}</span>
      <span onClick={() => onChange?.(value)}>X</span>
    </article>
  )
}

export { TokenItem }
