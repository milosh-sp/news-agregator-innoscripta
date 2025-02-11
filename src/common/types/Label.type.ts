import { LabelHTMLAttributes } from 'react'

interface LabelProps extends LabelHTMLAttributes<HTMLParagraphElement> {
  label?: string
  required?: boolean
}

export type { LabelProps }
