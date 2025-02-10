import { LabelHTMLAttributes } from 'react'

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  label?: string
  required?: boolean
}

export type { LabelProps }
