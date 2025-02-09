import { useState } from 'react'
import { useDebounce } from '../hooks/useDebounce'
import { Input, InputProps } from './Input' // Adjust import path

interface SearchInputProps extends InputProps {
  debounceDelay?: number
  initialValue?: string
}

/**
 * Debounced search input, the default delay is 500ms
 */
function SearchInput({
  onChange,
  debounceDelay,
  // empty string to avoid switching from uncontrolled to controlled component
  // error message
  initialValue = '',
  ...props
}: SearchInputProps) {
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

export { SearchInput }
