import { Input } from './Input'
import { useDropdown } from '../hooks/useDropdown'
import { DropdownOption, DropdownProps } from '../types/SearchableDropdown.type'
import { List } from './List'

/**
 * Generic dropdown component with search functionality
 */
function SearchableDropdown<T extends string>({
  options,
  value,
  onChange,
  placeholder,
  disabled = false,
  searchPlaceholder,
}: DropdownProps<T>) {
  const {
    isOpen,
    setIsOpen,
    searchQuery,
    setSearchQuery,
    dropdownRef,
    inputRef,
    filteredOptions,
  } = useDropdown(options)

  return (
    <article ref={dropdownRef} className="dropdown-container">
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        aria-haspopup="listbox"
      >
        {options.find((option) => option.value === value)?.label ?? placeholder}
      </button>

      {isOpen && (
        <div className="dropdown-list">
          <Input
            type="text"
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            ref={inputRef}
            aria-controls="dropdown-options"
            aria-autocomplete="list"
          />
          <List
            id="dropdown-list"
            items={filteredOptions ?? []}
            renderItem={(item: unknown) => {
              const option = item as DropdownOption<T>
              return (
                <article
                  key={String(option.value)}
                  role="option"
                  aria-selected={option.value === value}
                  onClick={() => {
                    if (!option.disabled) {
                      onChange?.(option.value)
                      setIsOpen(false)
                    }
                  }}
                >
                  {option.label}
                </article>
              )
            }}
          />
        </div>
      )}
    </article>
  )
}

export { SearchableDropdown }
