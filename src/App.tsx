import { DebouncedInput } from './common/components/DebouncedInput'
import { SearchableDropdown } from './common/components/Dropdown'
import './common/style/_normalize.scss'
import { useNewsArticles } from './features/newsArticles/newsArticleHooks'
import NewsArticles from './features/newsArticles/NewsArticles'
import { usePersonalFeed } from './features/personalFeed/personalFeedHooks'

function App() {
  const {
    articles,
    error,
    isLoading,
    articleMetaFilters,
    setQuery,
    filterArticlesBy,
  } = useNewsArticles()

  const { preference, setPersonalPreference } = usePersonalFeed()

  return (
    <main>
      <button
        onClick={() => filterArticlesBy({ key: 'category', value: 'health' })}
      >
        FILTER BY
      </button>

      <DebouncedInput
        placeholder="todays"
        debounceDelay={2_000}
        onChange={(value) => {
          if (value.target.value) {
            setQuery({ searchWord: value.target.value })
          }
        }}
      />

      <SearchableDropdown
        placeholder="mips"
        options={articleMetaFilters?.category?.map((cat, index) => ({
          value: String(index),
          label: cat,
        }))}
        onChange={(value) => {
          console.log(value)
        }}
      />

      <button onClick={() => filterArticlesBy()}>Reset filter</button>

      <button
        onClick={() =>
          setPersonalPreference({
            prefKey: 'categories',
            prefValue: 'business',
            action: 'add',
          })
        }
      >
        ADD BUSINESS PREFERENCE
      </button>
      <button
        onClick={() =>
          setPersonalPreference({
            prefKey: 'categories',
            prefValue: 'business',
            action: 'remove',
          })
        }
      >
        REMOVE BUSINESS PREFERENCE
      </button>
      <button
        onClick={() =>
          setPersonalPreference({
            action: 'reset',
          })
        }
      >
        RESET PREFERENCES
      </button>

      <section>User prefs:{JSON.stringify(preference, null, 2)}</section>

      <div>
        found categories:
        {articleMetaFilters?.category?.map((cat) => ` ${cat} *`)}
      </div>

      <br />

      <div>
        found authors:
        {articleMetaFilters?.author?.map((cat) => ` ${cat} *`)}
      </div>

      <br />
      <div>
        found sources:
        {articleMetaFilters?.source?.map((cat) => ` ${cat} *`)}
      </div>

      <h1>{error ? 'Error occurred' : ''}</h1>

      <h1>{isLoading ? 'Loading...' : ''}</h1>
      <section>
        <NewsArticles articles={articles} />
      </section>
    </main>
  )
}

export default App
