import { LabelHTMLAttributes } from 'react'

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  label?: string
  required?: boolean
}

function Label({ label, required, id, ...props }: LabelProps) {
  return (
    <label htmlFor={id} {...props}>
      {label}
      {required && label && <span aria-hidden="true">*</span>}
    </label>
  )
}

export { Label }
