import { InputProps } from './Input.type'

interface SearchInputProps extends InputProps {
  debounceDelay?: number
  initialValue?: string
}

export type { SearchInputProps }
