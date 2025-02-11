import { DebouncedInput } from '../../../common/components/DebouncedInput'
import { useNewsArticles } from '../hooks/useNewsArticles'
import { SearchbarOptions } from './SearchbarOptions'
import style from '../style/NewsArticleSearch.module.scss'
import { getString } from '../../../common/utils'

/**
 * Renders a debounced search bar
 */
function NewsArticleSearch() {
  const { setQuery } = useNewsArticles()

  return (
    <main className={style['news-article-search']}>
      <section className={style['news-article-search__input']}>
        <DebouncedInput
          placeholder={getString('SEARCH_ENTRY')}
          debounceDelay={2_000}
          spellCheck
          onChange={({ target: { value } }) => {
            if (!value) {
              return
            }
            setQuery({
              searchWord: value,
            })
          }}
        />
      </section>
      <section className={style['news-article-search__options']}>
        <SearchbarOptions />
      </section>
    </main>
  )
}

export { NewsArticleSearch }
