import React, { useRef } from 'react'
import { Dimensions } from 'react-native'
import SwiperLib, {
  SwiperProps as SwiperLibProps
} from 'react-native-web-swiper'

import { useColorScheme } from '#hooks/ui/theme'
import { translate } from '#utils'
import { useTheme } from 'styled-components/native'

import { Button, CustomStatusBar } from '#cmp'
import { Container, Image, Text } from '#cmp'

import Shimmer from './components/Shimmer'
import { SwiperProvider, useSwiper } from './context'
import Styles from './styles'
import { ISwiperComponentProps, ISwiperProps } from './types'

const SwipperFix = SwiperLib as SwiperLibProps as {
  new (): ISwiperProps
}

const Swiper = ({ ...rest }: Partial<ISwiperProps>) => {
  const {
    loading,
    steps,
    totalSteps,
    swiperRef,
    nextButton,
    skipAllButton,
    goToNext,
    goToLast
  } = useSwiper()

  const theme = useTheme()
  const { composeClientColors } = useColorScheme()
  const compositeColorScheme = composeClientColors({
    colorScheme: theme.colors.client.composition
  })
  const dimensions = Dimensions.get('screen')
  const imageHeight = Math.round((dimensions.width * 9) / 16)
  const imageWidth = dimensions.width
  const showShimmer = loading || steps.length <= 0

  return (
    <>
      {showShimmer && <Shimmer />}
      {!showShimmer && (
        <SwipperFix
          ref={swiperRef}
          containerStyle={{
            alignITems: 'center'
          }}
          {...rest}
        >
          {steps.map((step, index) => (
            <Styles.Container key={index}>
              <CustomStatusBar backgroundColor={theme.colors.white} />
              <Styles.Content>
                <Container mb="20px" px="16px" minHeight="50px">
                  {!!step.title && (
                    <Text fontSize="3xl" fontWeight="600">
                      {step.title}
                    </Text>
                  )}
                </Container>
                <Container flex={1}>
                  {!!step.image && (
                    <Image
                      width={imageWidth}
                      height={imageHeight}
                      source={{ uri: step.image }}
                      resizeMode="contain"
                    />
                  )}
                  <Styles.ScrollView>
                    <Text fontSize="lg">{step.text}</Text>
                  </Styles.ScrollView>
                </Container>
                <Container px="16px" mb="40px">
                  {step.addInContent && (
                    <Styles.AddedContent>
                      {step.addInContent}
                    </Styles.AddedContent>
                  )}
                  {index !== totalSteps && (
                    <Styles.SwiperActionsContainer>
                      {nextButton && (
                        <Button
                          size="lg"
                          onPress={goToNext}
                          testID={`tutorialButtonStep_${index + 1}`}
                          accessibilityLabel={translate(
                            `accessibility.component.swiper.next_button`
                          )}
                          color={compositeColorScheme?.color}
                          bgColor={compositeColorScheme?.backgroundColor}
                        >
                          component.swiper.next_step
                        </Button>
                      )}
                      {skipAllButton && (
                        <Styles.SkipAllText
                          raw
                          onPress={goToLast}
                          testID={`tutorialButtonSkip_${index + 1}`}
                          accessibilityLabel={translate(
                            `accessibility.component.swiper.skip_all_tutorial`
                          )}
                        >
                          {translate('component.swiper.skip_tutorial')}
                        </Styles.SkipAllText>
                      )}
                    </Styles.SwiperActionsContainer>
                  )}
                </Container>
              </Styles.Content>
            </Styles.Container>
          ))}
        </SwipperFix>
      )}
    </>
  )
}

const SwiperComponent: React.FC<ISwiperComponentProps> = ({
  steps,
  nextButton = true,
  skipAllButton = true,
  loading,
  ...rest
}) => {
  const swiperRef = useRef(null)

  return (
    <SwiperProvider
      loading={loading}
      swiperRef={swiperRef}
      steps={steps}
      nextButton={nextButton}
      skipAllButton={skipAllButton}
    >
      <Swiper {...rest} />
    </SwiperProvider>
  )
}

export default SwiperComponent
