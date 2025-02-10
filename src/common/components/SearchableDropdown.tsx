import { Input } from './Input'
import { useDropdown } from '../hooks/useDropdown'
import { DropdownOption, DropdownProps } from '../types/SearchableDropdown.type'
import { List } from './List'
import { Button } from './Button'
import style from './SearchableDropdown.module.scss'

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
    <section
      {...rest}
      ref={dropdownRef}
      className={style['searchable-dropdown']}
    >
      <Button
        className={style['searchable-dropdown__button']}
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        variant="primary"
      >
        {options.find((option) => option.value === value)?.label ?? placeholder}
      </Button>

      {isOpen && (
        <>
          <article className={style['searchable-dropdown__options-container']}>
            {!hideSearch && (
              <Input
                className={style['searchable-dropdown__input']}
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
              className={style['searchable-dropdown__list']}
              id="dropdown-list"
              items={filteredOptions ?? []}
              renderItem={(item) => {
                const option = item as DropdownOption<T>
                return (
                  <article
                    className={style['searchable-dropdown__option']}
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
        </>
      )}
    </section>
  )
}

export { SearchableDropdown }
