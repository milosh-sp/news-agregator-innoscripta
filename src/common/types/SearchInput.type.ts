import { InputProps } from './Input.type'

interface DebouncedInputProps extends InputProps {
  debounceDelay?: number
  initialValue?: string
}

export type { DebouncedInputProps }
