import style from '../style/ErrorText.module.scss'
import { ErrorTextProps } from '../types/ErrorText.type'

/**
 * Renders error text component
 */
function ErrorText({ errorText, ...rest }: ErrorTextProps) {
  return (
    <p className={style['error-text']} {...rest}>
      {errorText}
    </p>
  )
}

export { ErrorText }
