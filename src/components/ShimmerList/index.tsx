import React from 'react'

import ShimmerListItem from './components/ShimmerListItem'
import { IShimmerListProps } from './types'

const ShimmerList: React.FC<IShimmerListProps> = ({
  children,
  visible,
  itemCount = 3,
  showAvatar = true,
  showSubtitle = true
}) => {
  if (visible) return <>{children}</>

  const array = [...Array(itemCount)]

  return (
    <>
      {array.map((x, i) => (
        <ShimmerListItem
          key={`${x}-${i}`}
          showAvatar={showAvatar}
          showSubtitle={showSubtitle}
        />
      ))}
    </>
  )
}

export default ShimmerList
