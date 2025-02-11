import { ImgHTMLAttributes } from 'react'

type SvgIconTypes = 'author' | 'category' | 'source' | 'date'

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  svgIcon: SvgIconTypes
}

export type { ImageProps, SvgIconTypes }
