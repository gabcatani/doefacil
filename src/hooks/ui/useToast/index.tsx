import Toast from 'react-native-toast-message';
import {IToastFunction, TOASTTYPE} from './types'

const useToast = ({type, message}: IToastFunction) => {
    Toast.show({
      type: type,
      text1: message,
    });
}

export { useToast }