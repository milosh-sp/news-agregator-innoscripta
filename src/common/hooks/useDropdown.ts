import { useEffect, useRef, useState } from 'react'
import { DropdownOption } from '../types/Dropdown.type'

export function useDropdown<T extends string>(options: DropdownOption<T>[]) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const dropdownRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  //TODO: Check this will cause performance issues
  const filteredOptions = options?.filter((option) =>
    option?.label?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    } else {
      setSearchQuery('')
    }
  }, [isOpen])

  return {
    isOpen,
    setIsOpen,
    searchQuery,
    setSearchQuery,
    dropdownRef,
    inputRef,
    filteredOptions,
  }
}
