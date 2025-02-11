import { Button } from '../../common/components/Button'
import { MultiselectDropdown } from '../../common/components/MultiselectDropdown'
import { getString } from '../../common/utils'
import { useNewsArticles } from '../newsArticles/newsArticleHooks'
import { usePersonalFeed } from './personalFeedHooks'
import style from './PersonalPreferencesControls.module.scss'

/**
 * Controls to add personal preferences to the news feed with dropdown UI
 * elements. Each preference is saved on user's browser
 */
function PersonalPreferencesControls() {
  const { preference, setPersonalPreference } = usePersonalFeed()
  const { articleMetaFilters } = useNewsArticles()
  return (
    <section className={style['personal-preferences-controls']}>
      <section className={style['personal-preferences-controls__filters']}>
        <MultiselectDropdown
          options={articleMetaFilters.author.map((a) => ({
            value: a,
            label: a,
          }))}
          selectedValues={preference?.author}
          onChange={(value) =>
            setPersonalPreference({
              action: 'add',
              prefKey: 'author',
              prefValue: value as string,
            })
          }
          onValueRemoved={(value) => {
            setPersonalPreference({
              action: 'remove',
              prefKey: 'author',
              prefValue: value as string,
            })
          }}
          placeholder={getString('ADD_AUTHOR_BUTTON')}
        />
        <MultiselectDropdown
          options={articleMetaFilters?.category.map((category) => ({
            value: category,
            label: category,
          }))}
          selectedValues={preference?.category}
          onChange={(value) =>
            setPersonalPreference({
              action: 'add',
              prefKey: 'category',
              prefValue: value as string,
            })
          }
          onValueRemoved={(value) => {
            setPersonalPreference({
              action: 'remove',
              prefKey: 'category',
              prefValue: value as string,
            })
          }}
          placeholder={getString('ADD_CAT_BUTTON')}
        />
        <MultiselectDropdown
          options={articleMetaFilters?.source.map((source) => ({
            value: source,
            label: source,
          }))}
          selectedValues={preference?.source}
          onChange={(value) =>
            setPersonalPreference({
              action: 'add',
              prefKey: 'source',
              prefValue: value as string,
            })
          }
          onValueRemoved={(value) => {
            setPersonalPreference({
              action: 'remove',
              prefKey: 'source',
              prefValue: value as string,
            })
          }}
          placeholder={getString('ADD_SOURCE_BUTTON')}
        />
      </section>
      <Button
        variant="secondary"
        onClick={() => setPersonalPreference({ action: 'reset' })}
      >
        {getString('RESET_PREFS_BUTTON')}
      </Button>
    </section>
  )
}

export { PersonalPreferencesControls }
