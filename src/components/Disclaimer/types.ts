import { IContainerProps } from '#cmp/Container/types'

interface IDisclaimerProps extends IContainerProps {
  title?: string
  messages: string[]
  negative?: boolean
  bold?: boolean
  color?: string
}

export type { IDisclaimerProps }
