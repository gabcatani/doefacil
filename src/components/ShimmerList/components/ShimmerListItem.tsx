import React from 'react'
import { View, Animated } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import ShimmerPlaceholder from 'react-native-shimmer-placeholder'

import { IShimmerListItemProps } from '../types'

const ShimmerListItem: React.FC<IShimmerListItemProps> = ({
  showAvatar,
  showSubtitle
}) => {
  // Handle animation
  const avatarRef = React.createRef<ShimmerPlaceholder>()
  const firstLineRef = React.createRef<ShimmerPlaceholder>()
  const secondLineRef = React.createRef<ShimmerPlaceholder>()

  React.useEffect(() => {
    if (
      (!avatarRef.current && showAvatar) ||
      (!secondLineRef.current && showSubtitle) ||
      !firstLineRef.current
    )
      return

    let animated: Animated.CompositeAnimation | null = null

    if (showAvatar) {
      const list = [firstLineRef.current.getAnimated()]

      if (showSubtitle) {
        list.push(secondLineRef.current!.getAnimated())
      }

      animated = Animated.stagger(400, [
        avatarRef.current!.getAnimated(),
        Animated.parallel(list)
      ])
    } else {
      const list = []

      if (showSubtitle) {
        list.push(secondLineRef.current!.getAnimated())
      }

      animated = Animated.stagger(400, [
        firstLineRef.current.getAnimated(),
        Animated.parallel(list)
      ])
    }

    if (animated) Animated.loop(animated).start()
  }, [])

  return (
    <View style={{ marginBottom: 16 }}>
      <View style={{ flexDirection: 'row' }}>
        {showAvatar && (
          <ShimmerPlaceholder
            width={60}
            height={60}
            style={{ marginRight: 10, borderRadius: 30 }}
            ref={avatarRef}
            stopAutoRun
            visible={false}
            LinearGradient={LinearGradient}
          />
        )}
        <View style={{ justifyContent: 'center' }}>
          <ShimmerPlaceholder
            ref={firstLineRef}
            stopAutoRun
            visible={false}
            LinearGradient={LinearGradient}
            style={{ marginBottom: 5 }}
          />
          {showSubtitle && (
            <ShimmerPlaceholder
              ref={secondLineRef}
              stopAutoRun
              visible={false}
              LinearGradient={LinearGradient}
            />
          )}
        </View>
      </View>
    </View>
  )
}

export default ShimmerListItem
