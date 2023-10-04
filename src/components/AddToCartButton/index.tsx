import React, { useEffect } from 'react'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring
} from 'react-native-reanimated'

import { translate } from '#utils'
import { useTheme } from 'styled-components/native'

import AwesomeIcon from '../AwesomeIcon'
import Button from '../Button'
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
  const opacity = quantity > 0 ? 1 : 0
  const radius = quantity === 0 && !isAddWithSubtotal ? 100 : 8

  useEffect(() => {
    width.value = withSpring(opacity)
    borderRadius.value = radius
  }, [quantity, isAddWithSubtotal])

  const width = useSharedValue(opacity)
  const borderRadius = useSharedValue(radius)

  const buttonStyle = useAnimatedStyle(() => {
    return {
      flexDirection: 'row',
      flexShrink: 1,
      maxWidth: `${isAddWithSubtotal ? 100 : width.value * 100}%`
    }
  }, [isAddWithSubtotal, width.value])

  const containerStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: colors.client.secondary.backgroundColor,
      borderRadius: borderRadius.value,
      flexDirection: 'row',
      maxWidth: '100%',
      marginLeft: !isAddWithSubtotal ? 'auto' : 0,
      alignItems: 'center',
      overflow: 'hidden'
    }
  }, [borderRadius.value, isAddWithSubtotal])

  return (
    <Container width="100%">
      {isAddWithSubtotal && quantity === 0 ? (
        <Button
          testID={translate(
            `accessibility.component.add_to_cart.increment_button`
          )}
          accessibilityLabel={translate(
            `accessibility.component.add_to_cart.increment_button`
          )}
          onPress={onIncrement}
          size={'lg'}
        >
          Adicionar
        </Button>
      ) : (
        <Animated.View style={containerStyle}>
          <Animated.View style={buttonStyle}>
            <Styles.StyledButton
              bg="client.secondary.backgroundColor"
              size={addButtonSize}
              onPress={onDecrement}
              testID={translate(
                `accessibility.component.add_to_cart.decrement_button`
              )}
              accessibilityLabel={translate(
                `accessibility.component.add_to_cart.decrement_button`
              )}
            >
              <AwesomeIcon
                icon={showTrashIcon ? 'trash' : 'minus'}
                size={16}
                color={colors.client.secondary.color}
              />
            </Styles.StyledButton>
            <Container flex={1} alignItems="center" justifyContent="center">
              {quantity > 0 && (
                <Text
                  numberOfLines={1}
                  ellipsizeMode="clip"
                  fontSize="sm"
                  fontWeight="600"
                  color="client.secondary.color"
                  alignItems="center"
                  testID={translate(
                    `accessibility.component.add_to_cart.total_text`
                  )}
                  accessibilityLabel={translate(
                    `accessibility.component.add_to_cart.total_text`
                  )}
                >
                  {totalLabel}
                </Text>
              )}
            </Container>
          </Animated.View>

          <Container
            bg={disableAdd ? 'gray.100' : 'client.secondary.backgroundColor'}
          >
            <Styles.StyledButton
              bg="transparent"
              size={addButtonSize}
              onPress={onIncrement}
              testID={translate(
                `accessibility.component.add_to_cart.increment_styled_button`
              )}
              accessibilityLabel={translate(
                `accessibility.component.add_to_cart.increment_styled_button`
              )}
            >
              <AwesomeIcon
                icon="plus"
                size={16}
                color={
                  disableAdd ? colors.gray[500] : colors.client.secondary.color
                }
              />
            </Styles.StyledButton>
          </Container>
        </Animated.View>
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
