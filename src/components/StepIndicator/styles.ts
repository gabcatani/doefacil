import { useTheme } from 'styled-components/native'

const StepIndicatorStyles = () => {
  const {
    screens: {
      register: { active_step_color }
    },
    fontSizes,
    colors
  } = useTheme()

  const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 4,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: active_step_color,
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: active_step_color,
    stepStrokeUnFinishedColor: colors.gray[400],
    separatorFinishedColor: active_step_color,
    separatorUnFinishedColor: colors.gray[400],
    stepIndicatorFinishedColor: active_step_color,
    stepIndicatorUnFinishedColor: colors.gray[400],
    stepIndicatorCurrentColor: active_step_color,
    stepIndicatorLabelFontSize: fontSizes.md,
    currentStepIndicatorLabelFontSize: fontSizes.md,
    stepIndicatorLabelCurrentColor: colors.white,
    stepIndicatorLabelFinishedColor: colors.white,
    stepIndicatorLabelUnFinishedColor: colors.white,
    labelColor: colors.gray[500],
    labelSize: fontSizes.md,
    currentStepLabelColor: active_step_color
  }

  return customStyles
}
export default { StepIndicatorStyles }
