import React from 'react'

import TooltipContent from './components/Content'
import TooltipTrigger from './components/Trigger'
import { TooltipProvider } from './context'
import { ITooltipProps } from './types'

const TooltipRoot: React.FC<ITooltipProps> = props => {
  return (
    <TooltipProvider {...props}>
      <>{props.children}</>
    </TooltipProvider>
  )
}

const Tooltip = {
  Root: TooltipRoot,
  Trigger: TooltipTrigger,
  Content: TooltipContent
}

export default Tooltip
