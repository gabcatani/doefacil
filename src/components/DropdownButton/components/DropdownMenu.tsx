import React from 'react'
import { FlatList, Modal, TouchableOpacity } from 'react-native'

import { useTheme } from 'styled-components/native'

import Text from '../../Text'
import { useDropdownButton } from '../context'
import { DropdownContainer } from '../styles'

const DropdownMenu: React.FC = () => {
  const { menuOptions, isOpen, dropdownPosition, onCloseDropdown } =
    useDropdownButton()
  const theme = useTheme()

  return (
    <Modal visible={isOpen} transparent animationType="none">
      <TouchableOpacity
        style={{
          flexGrow: 1
        }}
        onPress={onCloseDropdown}
      >
        <DropdownContainer
          top={dropdownPosition.y}
          left={
            /* !toRight ? undefined : isHeader ? 16 : */ dropdownPosition.left
          }
          right={dropdownPosition.right}
        >
          <FlatList
            scrollEnabled={false}
            data={menuOptions.filter(opt => !opt.hideOption)}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  item.onClick()
                  onCloseDropdown()
                }}
              >
                <Text
                  color={theme.colors.gray[500]}
                  fontSize="sm"
                  fontWeight="500"
                  lineHeight="16px"
                  py="12px"
                  px="24px"
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            )}
            keyExtractor={(_, index) => index.toString()}
          />
        </DropdownContainer>
      </TouchableOpacity>
    </Modal>
  )
}

export default DropdownMenu
