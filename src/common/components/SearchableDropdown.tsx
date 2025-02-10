import { Input } from './Input'
import { useDropdown } from '../hooks/useDropdown'
import { DropdownOption, DropdownProps } from '../types/SearchableDropdown.type'
import { List } from './List'

/**
 * Generic dropdown component with search functionality, searchable
 * functionality can be disabled by passing in `hideSearch`
 */
function SearchableDropdown<T extends string>({
  options,
  value,
  onChange,
  placeholder,
  disabled,
  searchPlaceholder,
  hideSearch,
  ...rest
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
    <section {...rest} ref={dropdownRef}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        aria-haspopup="listbox"
      >
        {options.find((option) => option.value === value)?.label ?? placeholder}
      </button>

      {isOpen && (
        <article>
          {!hideSearch && (
            <Input
              type="text"
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              ref={inputRef}
              aria-controls="dropdown-options"
              aria-autocomplete="list"
            />
          )}
          <List
            id="dropdown-list"
            items={filteredOptions ?? []}
            renderItem={(item) => {
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
        </article>
      )}
    </section>
  )
}

export { SearchableDropdown }
