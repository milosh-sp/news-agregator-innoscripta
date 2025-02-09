import { Ref, forwardRef } from 'react'
import { Label } from './Label'
import { InputProps } from '../types/Input.type'

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
