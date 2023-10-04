import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Keyboard, LayoutChangeEvent, useWindowDimensions } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import RNBottomSheet, {
  BottomSheetBackdrop,
  BottomSheetTextInput,
  BottomSheetScrollView,
  BottomSheetView,
  useBottomSheetDynamicSnapPoints
} from '@gorhom/bottom-sheet'

import Container from '../Container'
import ModalHeader from '../ModalHeader'
import Text from '../Text'
import { IBottomSheetProps } from './types'

const BottomSheet: React.FC<IBottomSheetProps> = ({
  open,
  onClose,
  children,
  title,
  titleColor,
  description,
  snapPoints = ['CONTENT_HEIGHT'],
  isClosable = true,
  containerPx = '20px',
  onHeaderLayout,
  skipKeyboardClose = false
}) => {
  const bottomRef = useRef<RNBottomSheet>(null)
  const [show, setShow] = useState(open)
  const { height } = useWindowDimensions()
  const { bottom, top } = useSafeAreaInsets()

  const MIN_PADDING_BOTTOM = 20

  const renderBackdrop = useCallback(
    props => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        pressBehavior={isClosable ? 'close' : 'none'}
      />
    ),
    [isClosable]
  )

  const RenderContent = useMemo(() => {
    return (
      <Container px={containerPx} flex={1}>
        {!!description && (
          <Text fontWeight="600" fontSize="lg" mb="24px">
            {description}
          </Text>
        )}
        {children}
      </Container>
    )
  }, [description, children])

  const {
    animatedHandleHeight,
    animatedSnapPoints,
    animatedContentHeight,
    handleContentLayout
  } = useBottomSheetDynamicSnapPoints(snapPoints)

  const onContentLayoutChange = (e: LayoutChangeEvent) => {
    const sheetMaxHeight = height - top

    handleContentLayout({
      nativeEvent: {
        layout: {
          height: Math.min(sheetMaxHeight, e.nativeEvent.layout.height)
        }
      }
    })
  }

  const handleClose = useCallback(() => {
    Promise.all([
      !skipKeyboardClose && Keyboard.dismiss(),
      setTimeout(() => {
        bottomRef.current?.close()
        handleAfterCloseBottomSheet()
      }, 32)
    ])
  }, [])

  useEffect(() => {
    if (!open) handleClose()
    if (open) {
      !skipKeyboardClose && Keyboard.dismiss()
      setShow(true)
    }
  }, [open])

  const handleAfterCloseBottomSheet = () => {
    onClose()
    setShow(false)
  }

  if (!show) return null

  return (
    <RNBottomSheet
      ref={bottomRef}
      handleComponent={null}
      snapPoints={animatedSnapPoints}
      handleHeight={animatedHandleHeight}
      contentHeight={animatedContentHeight}
      backdropComponent={renderBackdrop}
      onChange={index => index === -1 && handleClose()}
      keyboardBehavior="interactive"
      keyboardBlurBehavior="restore"
      android_keyboardInputMode="adjustResize"
      onClose={handleAfterCloseBottomSheet}
      enablePanDownToClose={isClosable}
    >
      <BottomSheetView
        onLayout={onContentLayoutChange}
        style={{
          paddingBottom: Math.max(bottom, MIN_PADDING_BOTTOM)
        }}
      >
        <Container
          onLayout={({ nativeEvent: { layout } }) =>
            onHeaderLayout?.(layout.height)
          }
        >
          <Container my="20px">
            <ModalHeader
              title={title}
              titleColor={titleColor}
              onClose={handleClose}
              isClosable={isClosable}
            />
          </Container>
        </Container>
        {RenderContent}
      </BottomSheetView>
    </RNBottomSheet>
  )
}

export { FlatList as List }
export { BottomSheetTextInput as Input }
export { BottomSheetScrollView as ScrollView }
export default BottomSheet
