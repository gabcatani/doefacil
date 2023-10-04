interface IContainerProps {
  background: string
}

type AnimationType = 'loading' | 'success' | 'error'

interface IAnimationState {
  isVisible: boolean
  type: AnimationType
  image: string | NodeRequire
}

interface IAnimationOptions {
  autoHide?: boolean
  duration?: number
  callback?: VoidFunction
}

interface IAnimationProps {}

export type {
  IContainerProps,
  IAnimationProps,
  IAnimationState,
  AnimationType,
  IAnimationOptions
}
