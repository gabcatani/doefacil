import React, { useLayoutEffect } from 'react'

import { useApp } from '#contexts/app'
import { useConsumer } from '#contexts/consumer'
import { translate } from '#utils'
import { NextSeo } from 'next-seo'

import Container from '../Container'
import Styles from './styles'
import { IScreenProps } from './types'

const Screen: React.FC<IScreenProps> = ({
  seo,
  titleWeb,
  maxContentWidth = '1440px',
  backgroundColor,
  children,
  Header,
  Footer,
  ContentProps = {
    padding: '24px'
  }
}) => {
  const { company } = useApp()
  const { favoriteStore } = useConsumer()

  const translatedTitle = titleWeb ? translate(titleWeb) : ''
  const parsedTitleWeb = seo?.title ?? translatedTitle

  const url = company?.domain

  useLayoutEffect(() => {
    const headerHeight = ['top', 'middle', 'bottom'].reduce((prev, value) => {
      return (
        prev +
        (document.querySelector(`div#header-${value}`)?.clientHeight ?? 0)
      )
    }, 0)

    document.querySelector<HTMLElement>('div#container')!.style.minHeight =
      headerHeight ? `calc(100vh - ${headerHeight}px)` : '100%'
  }, [])

  return (
    <>
      <NextSeo
        {...seo}
        title={parsedTitleWeb}
        description={translate('common.seo.description', {
          domain: company?.domain
        })}
        titleTemplate={
          !parsedTitleWeb || parsedTitleWeb === favoriteStore?.name
            ? '%s'
            : `%s - ${favoriteStore?.name}`
        }
        defaultTitle={parsedTitleWeb}
        canonical={url}
        openGraph={{
          ...seo?.openGraph,
          url,
          title: parsedTitleWeb
        }}
      />

      <Container nativeID="container" backgroundColor={backgroundColor}>
        {Header}
        <Styles.Content maxWidth={maxContentWidth} {...ContentProps}>
          {children}
          {Footer}
        </Styles.Content>
      </Container>
    </>
  )
}

export default Screen
