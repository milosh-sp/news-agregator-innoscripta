import { InputHTMLAttributes, Ref, forwardRef } from 'react'
import { Label } from './Label'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

function InputComponent(
  { label, error, id, ...props }: InputProps,
  ref: Ref<HTMLInputElement>
) {
  return (
    <div>
      <Label label={label} required={props.required} id={id} />

      <input
        {...props}
        ref={ref}
        id={id}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
      />

      {error && (
        <p id={`${id}-error`} role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

/**
 * Input component with extended functionalities like error message rendering
 */
export const Input = forwardRef(InputComponent)
