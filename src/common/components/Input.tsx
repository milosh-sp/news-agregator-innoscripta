import { Label } from './Label'
import { InputProps } from '../types/Input.type'
import style from '../style/Input.module.scss'
import { ErrorText } from './ErrorText'

/**
 * Generic input component with extended error message and label
 */
function Input({ label, error, id, ...props }: InputProps) {
  return (
    <section className={style['input']}>
      {label && (
        <Label
          label={label}
          required={props.required}
          id={id}
          className={style['input__label']}
        />
      )}

      <input
        {...props}
        id={id}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`${style['input__elem']} ${props?.className ?? ''}`}
      />

      {error && <ErrorText errorText={error} />}
    </section>
  )
}

/**
 * Input component with extended functionalities like error message rendering
 */
export { Input }
