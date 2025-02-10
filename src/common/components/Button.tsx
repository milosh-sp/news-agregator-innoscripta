import { ButtonProps } from '../types/Button.type'
import style from '../style/Button.module.scss'

/**
 * Button with different variants
 */
function Button({ variant, children, className, ...rest }: ButtonProps) {
  return (
    <button
      className={` ${className ?? ''} ${style['button']} ${style[`button--${variant}`]}`}
      {...rest}
    >
      {children}
    </button>
  )
}

export { Button }
