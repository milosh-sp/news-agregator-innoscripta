import { useState } from 'react'
import { getString } from '../../../common/utils'
import { PersonalPreferencesControls } from '../../personalFeed/PersonalPreferencesControls'
import { NewsArticleFilters } from './NewsArticleFilters'
import { Button } from '../../../common/components/Button'
import style from '../style/SearchbarOptions.module.scss'
import { ButtonVariant } from '../../../common/types/Button.type'

const options = [
  {
    id: 'btn_flt',
    label: getString('OPTIONS_BUTTON_FILTER'),
    component: <NewsArticleFilters />,
    buttonType: 'primary',
  },
  {
    id: 'btn_prfs',
    label: getString('OPTIONS_BUTTON_PREFS'),
    component: <PersonalPreferencesControls />,
    buttonType: 'purple',
  },
]

function SearchbarOptions() {
  const [renderOptionIndex, setRenderOptionIndex] = useState(-1)

  const handleClick = (index: number) => () => {
    setRenderOptionIndex(renderOptionIndex === index ? -1 : index)
  }

  return (
    <section className={style['searchbar-options']}>
      {options.map(({ label, component, id, buttonType }, index) => {
        const showComponent = renderOptionIndex === index

        return (
          <section key={id} className={style['searchbar-options__container']}>
            <Button
              onClick={handleClick(index)}
              variant={buttonType as ButtonVariant}
            >
              {label}
            </Button>
            {showComponent && (
              <article className={style['searchbar-options__option']}>
                {component}
              </article>
            )}
          </section>
        )
      })}
    </section>
  )
}

export { SearchbarOptions }
