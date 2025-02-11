import { ImageProps } from '../types/Image.type'
import source from '../../assets/source.svg'
import author from '../../assets/author.svg'
import category from '../../assets/category.svg'
import date from '../../assets/calendar.svg'

// Attempt to import SVGs directly may lead to resolution issues with Vite
// Ensure that the assets are placed in the public directory or handled via proper bundling configuration

const iconMap = {
  author,
  category,
  source,
  date,
}

function Image({ svgIcon, ...rest }: ImageProps) {
  return <img src={iconMap[svgIcon]} alt={rest?.alt} {...rest} />
}

export { Image }
