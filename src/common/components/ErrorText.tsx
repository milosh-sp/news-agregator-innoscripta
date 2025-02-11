import style from '../style/ErrorText.module.scss'
/**
 * Renders error text component
 */
function ErrorText({ errorText }: { errorText: string }) {
  return <p className={style['error-text']}>{errorText}</p>
}

export { ErrorText }
