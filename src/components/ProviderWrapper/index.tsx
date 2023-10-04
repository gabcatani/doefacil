/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

import { IProviderWrapperProps } from './types'

const createProviderTree = (
  children: React.ReactNode,
  provider: React.ReactElement
): React.ReactElement => {
  return React.cloneElement(provider, {}, children)
}

const ProviderWrapper: React.FC<IProviderWrapperProps> = ({
  providers,
  children
}) => {
  return providers.reduceRight(
    createProviderTree,
    React.createElement(React.Fragment, {}, children)
  )
}

export default ProviderWrapper
