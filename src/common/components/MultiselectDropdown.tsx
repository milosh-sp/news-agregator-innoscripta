import { MultiselectDropdownProps } from '../types/MultiselectDropdown.type'
import { SearchableDropdown } from './SearchableDropdown'
import { SelectionTokens } from './SelectionTokens'

/**
 * Dropdown component with multiple selection capabilities, allows the user to
 * pick multiple items, the result is an array of selected values
 */
function MultiselectDropdown<T extends string>({
  options,
  onChange,
  onValueRemoved,
  selectedValues,
  ...props
}: MultiselectDropdownProps<T>) {
  return (
    <section>
      <SelectionTokens
        values={selectedValues}
        onChange={(value: string) => onValueRemoved?.(value as T)}
      />
      <SearchableDropdown
        {...props}
        options={options}
        onChange={(value: T) => {
          onChange?.(value)
        }}
      />
    </section>
  )
}

export { MultiselectDropdown }
