import { useState } from 'react'
import { useDebounce } from '../hooks/useDebounce'
import { Input } from './Input'
import { DebouncedInputProps } from '../types/SearchInput.type'

/**
 * Debounced search input, the default delay is 500ms
 */
function DebouncedInput({
  onChange,
  debounceDelay,
  // empty string to avoid switching from uncontrolled to controlled component
  // error message
  initialValue = '',
  ...props
}: DebouncedInputProps) {
  const [inputValue, setInputValue] = useState(initialValue)

  const debouncedOnChange = useDebounce({
    debounceTime: debounceDelay,
    onChange,
  })

  return (
    <Input
      {...props}
      value={inputValue}
      onChange={(e) => {
        setInputValue(e.target.value)
        debouncedOnChange(e)
      }}
      role="search"
      aria-label={props.label}
    />
  )
}

export { DebouncedInput }
