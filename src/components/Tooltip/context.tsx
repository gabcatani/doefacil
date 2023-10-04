import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState
} from 'react'
import { TouchableOpacity, useWindowDimensions } from 'react-native'

import Nullable from '#types/Nullable'

import { ITooltipContextData, ITooltipProps, ITriggerLayout } from './types'

const TooltipContext = createContext({} as ITooltipContextData)

const TooltipProvider: React.FC<ITooltipProps> = ({ children, ...props }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [triggerLayout, setTriggerLayout] =
    useState<Nullable<ITriggerLayout>>(null)
  const [contentSize, setContentSize] = useState({ h: 0, w: 0 })

  const { width } = useWindowDimensions()

  const buttonRef = useRef<TouchableOpacity>()

  const handleOpenDropdown = useCallback(() => {
    buttonRef.current?.measure((_fx, _fy, w, h, px, py) => {
      setTriggerLayout({ w, h, px, py })
    })
    if (!triggerLayout) {
      setTimeout(() => setIsOpen(true), 32)
    } else {
      setIsOpen(true)
    }
  }, [buttonRef, triggerLayout])

  const handleContentLayout = (e: { h: number; w: number }) => {
    setContentSize(e)
  }

  const handleCloseDropdown = () => {
    setIsOpen(false)
  }

  const contentPosition = useMemo(() => {
    if (!triggerLayout) {
      return null
    }

    const overAndCentralized = {
      top: triggerLayout.py - contentSize.h - 4,
      left: triggerLayout.px + (triggerLayout.w - contentSize.w) / 2
    }

    if (
      overAndCentralized.top > 0 &&
      overAndCentralized.left > 0 &&
      overAndCentralized.left + contentSize.w < width
    ) {
      return {
        left: `${overAndCentralized.left}px`,
        top: `${overAndCentralized.top}px`
      }
    }
    const topForSidePosition =
      triggerLayout.py + (triggerLayout.h - contentSize.h) / 2

    const toRight = {
      top: `${topForSidePosition > 8 ? topForSidePosition : 8}px`,
      left: triggerLayout.px + triggerLayout.w + 4
    }

    if (toRight.left > 0 && toRight.left + contentSize.w < width) {
      return { ...toRight, left: `${toRight.left}px` }
    }

    const toLeft = {
      top: `${topForSidePosition > 8 ? topForSidePosition : 8}px`,
      left: triggerLayout.px - contentSize.w - 4
    }

    if (toLeft.left > 0) {
      return { ...toLeft, left: `${toLeft.left}px` }
    }

    return null
  }, [triggerLayout, contentSize, width])

  return (
    <TooltipContext.Provider
      value={{
        isOpen,
        buttonRef,
        onOpenDropdown: handleOpenDropdown,
        onCloseDropdown: handleCloseDropdown,
        contentPosition,
        onContentLayout: handleContentLayout,
        ...props
      }}
    >
      {children}
    </TooltipContext.Provider>
  )
}

const useTooltip = (): ITooltipContextData => {
  const context = useContext(TooltipContext)

  if (!context)
    throw new Error('useTooltip must be used within a TooltipProvider')

  return context
}

export { TooltipProvider, useTooltip }
