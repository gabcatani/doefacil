import React, {
  createContext,
  useContext,
  useRef,
  useState,
  useCallback,
  useMemo
} from 'react'
import { TouchableOpacity } from 'react-native'

import { metrics } from '#utils'
import { useTheme } from 'styled-components/native'

import {
  IDropdownButtonContextData,
  IDropdownButtonProps,
  IDropDownPosition
} from './types'

const DropdownButtonContext = createContext({} as IDropdownButtonContextData)

const DropdownButtonProvider: React.FC<IDropdownButtonProps> = ({
  children,
  colorActive,
  colorInactive,
  bgActive,
  bgInactive,
  toRight,
  isHeader,
  ...props
}) => {
  const theme = useTheme()

  const [isOpen, setIsOpen] = useState(false)
  const [dropdownPosition, setDropdownPosition] = useState<IDropDownPosition>({
    y: 0,
    right: undefined,
    left: undefined
  })

  const buttonRef = useRef<TouchableOpacity>()

  const handleCloseDropdown = () => {
    setIsOpen(false)
  }

  const handleOpenDropdown = useCallback(() => {
    buttonRef.current?.measure((_fx, _fy, w, h, px, py) => {
      const left = toRight ? (isHeader ? 16 : px) : undefined
      const right = toRight
        ? undefined
        : isHeader
        ? 16
        : metrics.device_width - w - px

      setDropdownPosition({ y: py + h + 4, left, right })
    })
    if (dropdownPosition.y === 0) {
      setTimeout(() => setIsOpen(true), 32)
    } else {
      setIsOpen(true)
    }
  }, [buttonRef, dropdownPosition])

  const buttonColor = useMemo(
    () =>
      isOpen
        ? colorActive ?? theme.colors.gray[600]
        : colorInactive ?? theme.colors.gray[600],
    [isOpen]
  )

  const buttonBgColor = useMemo(
    () =>
      isOpen ? bgActive ?? theme.colors.gray[200] : bgInactive ?? 'transparent',
    [isOpen]
  )

  return (
    <DropdownButtonContext.Provider
      value={{
        isOpen,
        buttonRef,
        onOpenDropdown: handleOpenDropdown,
        onCloseDropdown: handleCloseDropdown,
        buttonColor,
        buttonBgColor,
        dropdownPosition,
        ...props
      }}
    >
      {children}
    </DropdownButtonContext.Provider>
  )
}

const useDropdownButton = (): IDropdownButtonContextData => {
  const context = useContext(DropdownButtonContext)

  if (!context)
    throw new Error(
      'useDropdownButton must be used within a DropdownButtonProvider'
    )

  return context
}

export { DropdownButtonProvider, useDropdownButton }
