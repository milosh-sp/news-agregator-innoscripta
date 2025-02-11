import { Label } from '../../../common/components/Label'
import { getString } from '../../../common/utils'
import { PreferencesProps } from '../types/Preferences.type'
import style from '../style/Preferences.module.scss'

/**
 * Renders user's preferences that they picked for their personal feed
 */
function Preferences({ preference }: PreferencesProps) {
  if (preference) {
    return (
      <main className={style['preferences']}>
        <section className={style['preferences__container']}>
          <Label label={getString('ADD_AUTHOR_BUTTON')} />
          <p>{preference.author.join(', ')}</p>
        </section>

        <section className={style['preferences__container']}>
          <Label label={getString('ADD_CAT_BUTTON')} />
          <p>{preference.category.join(', ')}</p>
        </section>

        <section className={style['preferences__container']}>
          <Label label={getString('ADD_SOURCE_BUTTON')} />
          <p>{preference.source.join(', ')}</p>
        </section>
      </main>
    )
  }
  return <></>
}

export { Preferences }
