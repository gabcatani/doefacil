import React, { useState } from 'react'

import { translate } from '#utils'

import AwesomeIcon from '../AwesomeIcon'
import S from './styles'
import { IAccordionProps } from './types'

const Accordion: React.FC<IAccordionProps> = ({
  title,
  children,
  ...props
}) => {
  const [expanded, setExpanded] = useState(false)

  return (
    <S.Container {...props}>
      <S.TitleContainer
        onPress={() => setExpanded(value => !value)}
        testID={translate(
          `accessibility.component.accordion.title_container_button`
        )}
        accessibilityLabel={translate(
          `accessibility.component.accordion.title_container_button`
        )}
      >
        {title}

        <AwesomeIcon
          size={14}
          icon={expanded ? 'chevron-up' : 'chevron-down'}
          testID={translate(`accessibility.component.accordion.icon`)}
        />
      </S.TitleContainer>
      {expanded && (
        <S.BodyContainer
          testID={translate(`accessibility.component.accordion.body_container`)}
          accessibilityLabel={translate(
            `accessibility.component.accordion.body_container`
          )}
        >
          {children}
        </S.BodyContainer>
      )}
    </S.Container>
  )
}

export default Accordion
