import { Button } from '../../common/components/Button'
import { DateDropdown } from '../../common/components/DateDropdown'
import { SearchableDropdown } from '../../common/components/SearchableDropdown'
import { useNewsArticles } from './newsArticleHooks'
import style from './NewsArticleFilters.module.scss'
import { getString } from '../../common/utils'

/**
 * Renders a set of buttons used for filtering articles
 */
function NewsArticleFilters() {
  const { filterArticlesBy, articleMetaFilters } = useNewsArticles()

  const searchPlaceholder = getString('SEARCH_ENTRY')

  return (
    <main className={style['news-article-filters']}>
      <section className={style['news-article-filters__type-filters']}>
        <SearchableDropdown
          placeholder={getString('ADD_CAT_BUTTON')}
          options={articleMetaFilters.category.map((c) => ({
            value: c,
            label: c,
          }))}
          onChange={(value) => filterArticlesBy({ value, key: 'category' })}
          searchPlaceholder={searchPlaceholder}
        />
        <SearchableDropdown
          placeholder={getString('ADD_SOURCE_BUTTON')}
          options={articleMetaFilters.source.map((c) => ({
            value: c,
            label: c,
          }))}
          onChange={(value) => filterArticlesBy({ value, key: 'source' })}
          searchPlaceholder={searchPlaceholder}
        />
      </section>
      <section className={style['news-article-filters__date-filters']}>
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
      </section>
      <Button
        type="button"
        variant="secondary"
        onClick={() => filterArticlesBy()}
      >
        {getString('RESET_BUTTON')}
      </Button>
    </main>
  )
}

export { NewsArticleFilters }
