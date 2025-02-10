import { useState } from 'react'
import { DateDropdown } from './common/components/DateDropdown'
import { DebouncedInput } from './common/components/DebouncedInput'
import { SearchableDropdown } from './common/components/SearchableDropdown'
import './common/style/_normalize.scss'
import { useNewsArticles } from './features/newsArticles/newsArticleHooks'
import { NewsArticles } from './features/newsArticles/NewsArticles'
import { usePersonalFeed } from './features/personalFeed/personalFeedHooks'
import { MultiselectDropdown } from './common/components/MultiselectDropdown'

function App() {
  const {
    articles,
    error,
    isLoading,
    articleMetaFilters,
    setQuery,
    filterArticlesBy,
  } = useNewsArticles()

  const [date, setDate] = useState<Date | null>(null)
  const [items, setItems] = useState([])

  const { preference, setPersonalPreference } = usePersonalFeed()

  console.log(items)
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
      <DateDropdown
        value={date}
        onChange={setDate}
        minYear={2000}
        maxYear={2030}
      />
      <MultiselectDropdown
        options={[
          {
            value: '1',
            label: '1',
          },
          {
            value: '2',
            label: '2',
          },
          {
            value: '3',
            label: '3',
          },
        ]}
        onSelect={(item) => setItems(item)}
        selectedValues={items}
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
