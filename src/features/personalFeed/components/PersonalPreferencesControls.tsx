import { Button } from '../../../common/components/Button'
import { SearchableDropdown } from '../../../common/components/SearchableDropdown'
import { getString } from '../../../common/utils'
import { useNewsArticles } from '../../newsArticles/hooks/useNewsArticles'
import { usePersonalFeed } from '../hooks/usePersonalFeed'
import style from './../style/PersonalPreferencesControls.module.scss'
import { Preferences } from './Preferences'

const buttonVariant = 'purple'

/**
 * Controls to add personal preferences to the news feed with dropdown UI
 * elements. Each preference is saved on user's browser
 */
function PersonalPreferencesControls() {
  const { setPersonalPreference, preference } = usePersonalFeed()
  const { articleMetaFilters, personalizeFeed } = useNewsArticles()
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
          }}
          placeholder={getString('ADD_SOURCE_BUTTON')}
          searchPlaceholder={searchPlaceholder}
          buttonVariant={buttonVariant}
        />
      </section>
      <Button
        variant="secondary"
        onClick={() => {
          setPersonalPreference({ action: 'reset' })
          personalizeFeed({ key: 'reset' })
        }}
      >
        {getString('RESET_BUTTON')}
      </Button>

      <Button
        variant="primary"
        onClick={() => {
          personalizeFeed()
        }}
      >
        {getString('PERSONALIZE_FEED')}
      </Button>

      <Preferences preference={preference} />
    </section>
  )
}

export { PersonalPreferencesControls }
