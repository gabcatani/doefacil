import React from 'react'

import { SpaceProps } from 'styled-system'

interface IAccordionProps extends SpaceProps {
  title: React.ReactElement
  roundTop?: boolean
  roundBottom?: boolean
}

interface IContainerProps extends SpaceProps {
  roundTop?: boolean
  roundBottom?: boolean
}

export type { IAccordionProps, IContainerProps }
