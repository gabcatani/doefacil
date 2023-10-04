import { ColorProps, SpaceProps } from 'styled-system'

interface ISeparatorProps extends ColorProps, SpaceProps {
  dir?: 'horizontal' | 'vertical'
}

export type { ISeparatorProps }
