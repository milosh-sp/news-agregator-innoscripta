import { ImageProps } from '../types/Image.type'
import source from '../../assets/source.svg'
import author from '../../assets/author.svg'
import category from '../../assets/category.svg'
import date from '../../assets/calendar.svg'

const iconMap = {
  author,
  category,
  source,
  date,
}

/**
 * Generic image component with preset svg icons
 */
function Image({ svgIcon, ...rest }: ImageProps) {
  if (!svgIcon) return <img src={rest.src} alt={rest?.alt} {...rest} />
  return <img src={iconMap?.[svgIcon] ?? ''} alt={rest?.alt} {...rest} />
}

export { Image }
