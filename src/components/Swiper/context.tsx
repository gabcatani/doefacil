import React, { createContext, useContext, useEffect, useState } from 'react'

import { ISwiperContextData, ISwiperProviderProps } from './types'

export const SwiperContext = createContext({} as ISwiperContextData)

export const SwiperProvider: React.FC<ISwiperProviderProps> = ({
  steps,
  loading,
  nextButton,
  skipAllButton,
  swiperRef,
  children
}) => {
  const totalSteps = steps.length - 1
  const [isLoading, setIsLoading] = useState(loading)

  const goToNext = () => {
    if (!swiperRef.current) return

    const currentStep = swiperRef.current.getActiveIndex()

    swiperRef.current.goTo(currentStep + 1)
  }

  const goToLast = () => {
    swiperRef.current?.goTo(totalSteps)
  }

  // O componente swipe não aceita conteúdos dinamicos
  // Por essa razão este código é necessário pra forçar uma renderização
  useEffect(() => {
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 1000)
  }, [loading, steps])

  return (
    <SwiperContext.Provider
      value={{
        steps,
        loading: isLoading,
        totalSteps,
        swiperRef,
        goToNext,
        goToLast,
        nextButton,
        skipAllButton
      }}
    >
      {children}
    </SwiperContext.Provider>
  )
}

export const useSwiper = (): ISwiperContextData => {
  const context = useContext(SwiperContext)

  if (!context)
    throw new Error('useTutorial must be used within a TutorialProvider')

  return context
}
