import React from 'react'

import { useTheme } from 'styled-components/native'

import Button from '#cmp/Button'

import AwesomeIcon from '../AwesomeIcon'
import Container from '../Container'
import Text from '../Text'
import { AddToCartButtonProvider, useAddToCartButton } from './context'
import Styles from './styles'
import { IAddToCartButtonProps } from './types'

const AddToCartButtonComponent = () => {
  const {
    quantity,
    onIncrement,
    onDecrement,
    totalLabel,
    showTrashIcon,
    disableAdd,
    addButtonSize = '28px',
    isAddWithSubtotal
  } = useAddToCartButton()

  const { colors } = useTheme()

  return (
    <Container width="100%">
      {isAddWithSubtotal && quantity === 0 ? (
        <Button
          testID={'button_add_to_cart_initial_large'}
          accessibilityLabel={'button_add_to_cart_initial_large'}
          onPress={onIncrement}
          size={'lg'}
        >
          Adicionar
        </Button>
      ) : (
        <div
          style={{
            backgroundColor: colors.client.secondary.backgroundColor,
            borderRadius: quantity === 0 && !isAddWithSubtotal ? 100 : 8,
            display: 'flex',
            overflow: 'hidden',
            justifyContent: 'center',
            marginLeft: quantity > 0 ? 0 : 'auto',
            marginRight: 0
          }}
        >
          <div
            style={{
              display: 'flex',
              width: quantity > 0 ? '100%' : 0,
              transition: 'width 100ms cubic-bezier(0.8, 0.17, 0.15, 0.69)',
              flex: 1
            }}
          >
            <Styles.StyledButton
              bg="client.secondary.backgroundColor"
              size={addButtonSize}
              onPress={onDecrement}
              accessibilityLabel="decrement"
              testID="decrement"
            >
              <AwesomeIcon
                icon={showTrashIcon ? 'trash' : 'minus'}
                size={16}
                color={colors.client.secondary.color}
              />
            </Styles.StyledButton>
            <Container flex={1} alignItems="center" justifyContent="center">
              <Text
                numberOfLines={1}
                ellipsizeMode="clip"
                fontSize="sm"
                fontWeight="600"
                color="client.secondary.color"
                alignItems="center"
              >
                {totalLabel}
              </Text>
            </Container>
          </div>

          <Container
            bg={disableAdd ? 'gray.100' : 'client.secondary.backgroundColor'}
          >
            <Styles.StyledButton
              bg="transparent"
              size={addButtonSize}
              onPress={onIncrement}
              accessibilityLabel="increment"
              testID="increment"
            >
              <AwesomeIcon
                icon="plus"
                size={16}
                color={
                  disableAdd ? colors.gray[700] : colors.client.secondary.color
                }
              />
            </Styles.StyledButton>
          </Container>
        </div>
      )}
    </Container>
  )
}

const AddToCartButton: React.FC<IAddToCartButtonProps> = props => {
  return (
    <AddToCartButtonProvider {...props}>
      <AddToCartButtonComponent />
    </AddToCartButtonProvider>
  )
}

export default AddToCartButton
