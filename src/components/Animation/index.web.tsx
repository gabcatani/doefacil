/* eslint-disable @typescript-eslint/no-var-requires */
import React from 'react'
import { Modal } from 'react-native'

import LottieView from 'lottie-react'

import S from './styles'
import {
  IAnimationProps,
  IAnimationState,
  AnimationType,
  IAnimationOptions
} from './types'

const animatedError = require('#res/animations/AnimatedError.json')
const animatedSuccess = require('#res/animations/AnimatedSuccess.json')

export default class Animation extends React.PureComponent<
  IAnimationProps,
  IAnimationState
> {
  state = {
    isVisible: false,
    type: 'loading' as AnimationType,
    image: ''
  }

  static _ref: Animation
  static _callback: VoidFunction | null | undefined = null

  static setRef(ref: Animation) {
    this._ref = ref
  }

  static getRef() {
    return this._ref
  }

  static show(
    type: AnimationType,
    options = { autoHide: true, duration: 2500 } as IAnimationOptions
  ) {
    if (typeof options.autoHide === 'undefined') options.autoHide = true
    if (typeof options.duration === 'undefined') options.duration = 2500

    Animation._callback = options.callback
    const ref = this.getRef()
    if (ref) {
      switch (type) {
        case 'success':
          ref.setImage(type, animatedSuccess)
          break
        case 'error':
          ref.setImage(type, animatedError)
          break
        default:
          ref.setImage('loading', '')
      }

      ref.setVisibility(true)
      if (options.autoHide) {
        setTimeout(() => Animation._handleHide(ref), options.duration)
      }
    }
  }

  static _handleHide(ref: Animation) {
    ref.setVisibility(false)
    if (Animation._callback) {
      Animation._callback()
      Animation._callback = null
    }
  }

  static hide() {
    const ref = this.getRef()

    if (ref) {
      Animation._handleHide(ref)
    }
  }

  setImage(type: AnimationType, image: string | NodeRequire) {
    this.setState({ type, image })
  }

  setVisibility(isVisible: boolean) {
    this.setState({ isVisible })
  }

  fullModal = () => {
    const { image, type } = this.state
    return (
      <Modal
        animationType="slide"
        transparent={false}
        supportedOrientations={['portrait', 'landscape']}
      >
        <S.Container background={type}>
          <LottieView loop={false} animationData={image} />
        </S.Container>
      </Modal>
    )
  }

  loading = () => {
    return (
      <S.LoadingContainer>
        <S.SpinnerContainer>
          <S.Spinner />
        </S.SpinnerContainer>
      </S.LoadingContainer>
    )
  }

  animation = () => {
    return (
      <S.LoadingContainer>
        <S.SpinnerContainer>
          <LottieView
            loop={false}
            animationData={this.state.image}
            style={{ width: 150, height: 150 }}
          />
        </S.SpinnerContainer>
      </S.LoadingContainer>
    )
  }

  render() {
    const { isVisible, type } = this.state

    if (!isVisible) return null

    if (type === 'loading') return this.loading()
    if (type === 'success' || type === 'error') return this.fullModal()
    return this.animation()
  }
}
