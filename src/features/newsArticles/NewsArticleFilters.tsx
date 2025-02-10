import { Button } from '../../common/components/Button'
import { DateDropdown } from '../../common/components/DateDropdown'
import { SearchableDropdown } from '../../common/components/SearchableDropdown'
import { useNewsArticles } from './newsArticleHooks'

function NewsArticleFilters() {
  const { filterArticlesBy, articleMetaFilters } = useNewsArticles()

  return (
    <main>
      <SearchableDropdown
        placeholder="filter by category"
        options={articleMetaFilters.category.map((c) => ({
          value: c,
          label: c,
        }))}
        onChange={(value) => filterArticlesBy({ value, key: 'category' })}
      />
      <SearchableDropdown
        placeholder="filter by source"
        options={articleMetaFilters.source.map((c) => ({
          value: c,
          label: c,
        }))}
        onChange={(value) => filterArticlesBy({ value, key: 'source' })}
      />
      <DateDropdown
        minYear={1900}
        maxYear={new Date().getFullYear()}
        onChange={(value) => {
          if (value) {
            filterArticlesBy({
              value: {
                from: value?.toISOString(),
              },
              key: 'date',
            })
          }
        }}
      />
      <DateDropdown 
        minYear={1900}
        maxYear={new Date().getFullYear()}
        onChange={(value) => {
          if (value) {
            filterArticlesBy({
              value: {
                to: value?.toISOString(),
              },
              key: 'date',
            })
          }
        }}
      />
      <Button onClick={() => filterArticlesBy()}>RESET FILTERS</Button>
    </main>
  )
}

export { NewsArticleFilters }
