import { DebouncedInput } from '../../common/components/DebouncedInput'
import { useNewsArticles } from './newsArticleHooks'

function NewsArticleSearch() {
  const { setQuery } = useNewsArticles()

  return (
    <section>
      <DebouncedInput
        debounceDelay={2_000}
        spellCheck
        onChange={({ target: { value } }) =>
          setQuery({
            searchWord: value,
          })
        }
      />
    </section>
  )
}

export { NewsArticleSearch }
