import { TokenItemProps } from '../types/TokenItem.type'
import style from './TokenItem.module.scss'

/**
 * Token item component, returns a value `onChange`
 */
function TokenItem({ value, onChange }: TokenItemProps) {
  return (
    <article className={style['token-item']}>
      <span key={value} className={style['token-item__value']}>
        {value}
      </span>
      <span
        onClick={() => onChange?.(value)}
        className={style['token-item__delete']}
      >
        X
      </span>
    </article>
  )
}

export { TokenItem }
