import { Button } from '../../common/components/Button'
import { SearchableDropdown } from '../../common/components/SearchableDropdown'
import { getString } from '../../common/utils'
import { useNewsArticles } from '../newsArticles/newsArticleHooks'
import { usePersonalFeed } from './personalFeedHooks'
import style from './PersonalPreferencesControls.module.scss'
import { Preferences } from './Prefferences'

const buttonVariant = 'purple'

/**
 * Controls to add personal preferences to the news feed with dropdown UI
 * elements. Each preference is saved on user's browser
 */
function PersonalPreferencesControls() {
  const { setPersonalPreference, preference } = usePersonalFeed()
  const { articleMetaFilters, filterArticlesBy } = useNewsArticles()
  const searchPlaceholder = getString('SEARCH_ENTRY')
  return (
    <section className={style['personal-preferences-controls']}>
      <section className={style['personal-preferences-controls__filters']}>
        <SearchableDropdown
          options={articleMetaFilters.author.map((a) => ({
            value: a,
            label: a,
          }))}
          onChange={(value) => {
            setPersonalPreference({
              action: 'add',
              prefKey: 'author',
              prefValue: value as string,
            })
            filterArticlesBy({ value: value as string, key: 'author' })
          }}
          placeholder={getString('ADD_AUTHOR_BUTTON')}
          searchPlaceholder={searchPlaceholder}
          buttonVariant={buttonVariant}
        />
        <SearchableDropdown
          options={articleMetaFilters?.category.map((category) => ({
            value: category,
            label: category,
          }))}
          onChange={(value) => {
            setPersonalPreference({
              action: 'add',
              prefKey: 'category',
              prefValue: value as string,
            })
            filterArticlesBy({ value: value as string, key: 'category' })
          }}
          placeholder={getString('ADD_CAT_BUTTON')}
          searchPlaceholder={searchPlaceholder}
          buttonVariant={buttonVariant}
        />
        <SearchableDropdown
          options={articleMetaFilters?.source.map((source) => ({
            value: source,
            label: source,
          }))}
          onChange={(value) => {
            setPersonalPreference({
              action: 'add',
              prefKey: 'source',
              prefValue: value as string,
            })
            filterArticlesBy({ value: value as string, key: 'source' })
          }}
          placeholder={getString('ADD_SOURCE_BUTTON')}
          searchPlaceholder={searchPlaceholder}
          buttonVariant={buttonVariant}
        />
      </section>
      <Button
        variant="secondary"
        onClick={() => {
          filterArticlesBy()
          setPersonalPreference({ action: 'reset' })
        }}
      >
        {getString('RESET_BUTTON')}
      </Button>

      <Preferences preference={preference} />
    </section>
  )
}

export { PersonalPreferencesControls }
