import { IconAndElementProps } from '../types/IconAndElement.type'
import { Image } from './Image'
import style from '../style/IconAndElement.module.scss'

function IconAndElement({ icon, children }: IconAndElementProps) {
  return (
    <article className={style['icon-and-element']}>
      {icon && (
        <Image
          svgIcon={icon}
          alt={icon as unknown as string}
          className={style['icon-and-element__icon']}
        />
      )}
      {children}
    </article>
  )
}

export { IconAndElement }
