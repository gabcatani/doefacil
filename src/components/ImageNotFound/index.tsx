import React from 'react'
import { Platform } from 'react-native'

import Images from '#res/images'
import { translate } from '#utils'
import NextImage from 'next/image'

import Container from '#cmp/Container'

import Styles from './styles'
import { IImageNotFoundProps } from './types'

const isWeb = Platform.OS === 'web'

const ImageNotFound = ({
  withLabel = true,
  size = 40,
  labelProps
}: IImageNotFoundProps) => {
  const Image = () => (
    <>
      {isWeb ? (
        <Container width={size} height={size}>
          <NextImage
            src={Images.NotFound}
            alt="Image not found"
            layout="fill"
            objectFit="contain"
            unoptimized
          />
        </Container>
      ) : (
        <Styles.StyledImage
          size={size}
          resizeMode="contain"
          source={Images.NotFound}
        />
      )}
    </>
  )

  return (
    <Styles.Container>
      <Image />
      {withLabel && (
        <Styles.StyledText {...labelProps} raw>
          {translate('component.image_not_found.label')}
        </Styles.StyledText>
      )}
    </Styles.Container>
  )
}

export default ImageNotFound
