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
  selectedValues,
}: MultiselectDropdownProps<T>) {
  const handleSelect = (value: T) => {
    if (selectedValues?.includes(value)) return
    const newSelectedValues = [...(selectedValues ?? []), value]
    onChange?.(newSelectedValues)
  }

  const handleDeselect = (value: T) => {
    const newSelectedValues = selectedValues?.filter((v) => v !== value) ?? []
    onChange?.(newSelectedValues)
  }

  console.log(selectedValues)

  return (
    <section>
      <SelectionTokens
        values={selectedValues}
        onChange={(value: string) => handleDeselect(value as T)}
      />
      <SearchableDropdown options={options} onChange={handleSelect} />
    </section>
  )
}

export { MultiselectDropdown }
