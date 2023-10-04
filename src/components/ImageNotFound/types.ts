import { SpaceProps, LayoutProps } from 'styled-system'

import { ITextProps } from '#cmp/Text/types'

interface IImageNotFoundProps {
  withLabel?: boolean
  size?: number
  labelProps?: SpaceProps & LayoutProps & ITextProps
}

export type { IImageNotFoundProps }
