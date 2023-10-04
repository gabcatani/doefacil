import { SpaceProps } from 'styled-system'

interface IStyledHeaderContainer extends SpaceProps {}

interface IHeaderProps extends IStyledHeaderContainer {
  title: string
  subtitle?: string
}

export type { IHeaderProps, IStyledHeaderContainer }
