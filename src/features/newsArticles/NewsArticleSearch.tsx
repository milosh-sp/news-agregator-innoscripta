import { DebouncedInput } from '../../common/components/DebouncedInput'
import { useNewsArticles } from './newsArticleHooks'
import { SearchbarOptions } from './SearchbarOptions'
import style from './NewsArticleSearch.module.scss'

function NewsArticleSearch() {
  const { setQuery } = useNewsArticles()

  return (
    <main className={style['news-article-search']}>
      <section className={style['news-article-search__input']}>
        <DebouncedInput
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
