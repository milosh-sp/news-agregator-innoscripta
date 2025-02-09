import './common/style/_normalize.scss'
import { useNewsArticles } from './features/newsArticles/newsArticleHooks'
import { usePersonalFeed } from './features/personalFeed/personalFeedHooks'
import { SearchInput } from './common/components/SearchInput'

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

      <SearchInput
        placeholder="todays"
        debounceDelay={2_000}
        onChange={(value) => {
          if (value.target.value) {
            setQuery({ searchWord: value.target.value })
          }
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
        {articleMetaFilters?.category.map((cat) => ` ${cat} *`)}
      </div>

      <br />

      <div>
        found authors:
        {articleMetaFilters?.author.map((cat) => ` ${cat} *`)}
      </div>

      <br />
      <div>
        found sources:
        {articleMetaFilters?.source.map((cat) => ` ${cat} *`)}
      </div>

      <h1>{error ? 'Error occurred' : ''}</h1>

      <h1>{isLoading ? 'Loading...' : ''}</h1>
      <section>
        {articles?.map((article) => (
          <article key={article?.url}>
            <h2>{article?.title}</h2>
            <h3>Category: {article?.category}</h3>
            <h4>Source: {article?.source}</h4>
            <p>Published at:{article?.publishedAt}</p>
            <p>Author: {article?.author}</p>
            <p>Description: {article?.description}</p>
            <p>Original url: {article?.url}</p>
            <img
              src={article?.imageUrl ?? undefined}
              style={{
                width: '100px',
                height: '100px',
              }}
              alt={article?.title}
            />
          </article>
        ))}
      </section>
    </main>
  )
}

export default App
