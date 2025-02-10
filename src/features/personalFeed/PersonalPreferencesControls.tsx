import { Button } from '../../common/components/Button'
import { MultiselectDropdown } from '../../common/components/MultiselectDropdown'
import { useNewsArticles } from '../newsArticles/newsArticleHooks'
import { usePersonalFeed } from './personalFeedHooks'

function PersonalPreferencesControls() {
  const { preference, setPersonalPreference } = usePersonalFeed()
  const { articleMetaFilters } = useNewsArticles()
  return (
    <section>
      <MultiselectDropdown
        options={articleMetaFilters.author.map((a) => ({
          value: a,
          label: a,
        }))}
        selectedValues={preference.authors}
        onChange={(value) =>
          setPersonalPreference({
            action: 'add',
            prefKey: 'authors',
            prefValue: value as string,
          })
        }
        onValueRemoved={(value) => {
          setPersonalPreference({
            action: 'remove',
            prefKey: 'authors',
            prefValue: value as string,
          })
        }}
        placeholder="Add author"
      />
      <MultiselectDropdown
        options={articleMetaFilters.category.map((category) => ({
          value: category,
          label: category,
        }))}
        selectedValues={preference.categories}
        onChange={(value) =>
          setPersonalPreference({
            action: 'add',
            prefKey: 'categories',
            prefValue: value as string,
          })
        }
        onValueRemoved={(value) => {
          setPersonalPreference({
            action: 'remove',
            prefKey: 'categories',
            prefValue: value as string,
          })
        }}
        placeholder="Add categories"
      />
      <MultiselectDropdown
        options={articleMetaFilters.source.map((source) => ({
          value: source,
          label: source,
        }))}
        selectedValues={preference.sources}
        onChange={(value) =>
          setPersonalPreference({
            action: 'add',
            prefKey: 'sources',
            prefValue: value as string,
          })
        }
        onValueRemoved={(value) => {
          setPersonalPreference({
            action: 'remove',
            prefKey: 'sources',
            prefValue: value as string,
          })
        }}
        placeholder="Add sources"
      />
      <Button onClick={() => setPersonalPreference({ action: 'reset' })}>
        RESET PREFERENCE
      </Button>
    </section>
  )
}

export { PersonalPreferencesControls }
