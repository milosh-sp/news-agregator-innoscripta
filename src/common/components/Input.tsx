import { InputHTMLAttributes, Ref, forwardRef } from 'react'

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
      <label htmlFor={id}>
        {label}
        {props.required && label && <span aria-hidden="true">*</span>}
      </label>

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
