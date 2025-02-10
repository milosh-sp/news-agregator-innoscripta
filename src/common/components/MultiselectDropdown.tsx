import { MultiselectDropdownProps } from '../types/MultiselectDropdown.type'
import { SearchableDropdown } from './SearchableDropdown'
import { SelectionTokens } from './SelectionTokens'

function MultiselectDropdown<T extends string>({
  options,
  onSelect,
  selectedValues,
}: MultiselectDropdownProps<T>) {
  const handleSelect = (value: T) => {
    if (selectedValues?.includes(value)) return
    const newSelectedValues = [...(selectedValues ?? []), value]
    onSelect?.(newSelectedValues)
  }

  const handleDeselect = (value: T) => {
    const newSelectedValues = selectedValues?.filter((v) => v !== value) ?? []
    onSelect?.(newSelectedValues)
  }

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
