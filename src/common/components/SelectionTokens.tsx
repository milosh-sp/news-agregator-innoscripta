import { HTMLAttributes } from 'react'

interface SelectionTokensProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  values?: Array<string>
  onChange?: (value: string) => void
}

function SelectionTokens({
  values = [],
  onChange,
  ...props
}: SelectionTokensProps) {
  return (
    <div {...props}>
      {values.map((value) => (
        <>
          <span key={value}>{value}</span>
          <span onClick={() => onChange?.(value)}>X</span>
        </>
      ))}
    </div>
  )
}

export { SelectionTokens }
