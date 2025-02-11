import { DebouncedInput } from '../../common/components/DebouncedInput'
import { useNewsArticles } from './newsArticleHooks'
import { SearchbarOptions } from './SearchbarOptions'

function NewsArticleSearch() {
  const { setQuery } = useNewsArticles()

  return (
    <section>
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
      <SearchbarOptions />
    </section>
  )
}

export { NewsArticleSearch }
