import React, { ReactElement } from 'react'

import { ICaseProps } from './types'

const Root: React.FC = ({ children }) => {
  let otherwise: React.ReactNode = null

  if (Array.isArray(children)) {
    for (const child of children) {
      if (child.type.name === 'Case' && child.props.condition) {
        return child
      } else if (child.type.name === 'Default') {
        otherwise = child
      }
    }
  } else {
    const element = children as ReactElement<ICaseProps>
    if (element.props.condition) {
      return element
    }
  }

  return otherwise
}

const Case: React.FC<ICaseProps> = ({ children, condition }) => {
  if (!condition) return null

  return <>{children}</>
}

const Default: React.FC = ({ children }) => {
  return <>{children}</>
}

const Visibility = {
  Root: Root,
  Case: Case,
  Default: Default
}

export default Visibility
