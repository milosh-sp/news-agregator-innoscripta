import { Button } from '../../common/components/Button'
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
      <Button onClick={() => filterArticlesBy()}>RESET FILTERS</Button>
    </main>
  )
}

export { NewsArticleFilters }
