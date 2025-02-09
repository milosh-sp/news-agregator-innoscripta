import { useState } from 'react'

/**
 * Delays a function call, takes in a function and returns a debounced function
 */
export function useDebounce<T>({
  onChange,
  debounceTime,
}: {
  onChange?: (value: T) => void
  debounceTime?: number
}) {
  const [timer, setTimer] = useState<number | undefined | NodeJS.Timeout>(
    undefined
  )

  const debouncedFunction = (inputValue: T) => {
    clearTimeout(timer)

    const newTimer = setTimeout(() => {
      onChange?.(inputValue)
    }, debounceTime)

    setTimer(newTimer)
  }

  return debouncedFunction
}
