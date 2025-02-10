import { ButtonProps } from '../types/Button.type'

/**
 * Button with different variants
 */
function Button({ variant, children, ...rest }: ButtonProps) {
  return (
    <button {...rest} className={variant}>
      {children}
    </button>
  )
}

export { Button }
