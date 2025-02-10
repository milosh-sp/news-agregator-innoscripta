import { HTMLAttributes } from 'react'

interface SelectionTokensProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  values?: Array<string>
  onChange?: (value: string) => void
}

export type { SelectionTokensProps }
