import React, { useEffect } from 'react'
import { LayoutRectangle, View } from 'react-native'

import { useScreen } from '#cmp/Screen/context'

interface IntersectProps {
  onIntersect: (isIntersecting: boolean) => void
}

export const Intersect: React.FC<IntersectProps> = ({
  children,
  onIntersect
}) => {
  const { onIntersectionPointChanged, isIntersecting } = useScreen()

  const handleLayoutChange = (layout: LayoutRectangle) => {
    onIntersectionPointChanged(layout.y)
    onIntersect(isIntersecting)
  }

  useEffect(() => {
    onIntersect(isIntersecting)
  }, [isIntersecting])

  return (
    <View
      onLayout={event => {
        handleLayoutChange(event.nativeEvent.layout)
      }}
    >
      {children}
    </View>
  )
}

export default Intersect
