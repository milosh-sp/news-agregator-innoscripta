import { LabelProps } from '../types/Label.type'

/**
 * Label component with required indicator(*) if `required` is true
 */
function Label({ label, required, id, ...props }: LabelProps) {
  return (
    <label htmlFor={id} {...props}>
      {label}
      {required && label && <span aria-hidden="true">*</span>}
    </label>
  )
}

export { Label }
