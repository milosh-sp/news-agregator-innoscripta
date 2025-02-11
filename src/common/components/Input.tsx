import { Ref, forwardRef } from 'react'
import { Label } from './Label'
import { InputProps } from '../types/Input.type'
import style from '../style/Input.module.scss'
import { ErrorText } from './ErrorText'

function InputComponent(
  { label, error, id, ...props }: InputProps,
  ref: Ref<HTMLInputElement>
) {
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
        ref={ref}
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
export const Input = forwardRef(InputComponent)
