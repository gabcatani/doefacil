/**
 * @format
 */

import 'react-native-gesture-handler'
import Routes from './src/navigation'
import Toast from 'react-native-toast-message';
import { ThemeProvider } from 'styled-components';
import theme from './src/theme'; 
import { MMKV } from 'react-native-mmkv';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export const storageLocal = new MMKV();

function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <ThemeProvider theme={theme}>
      <Routes />
      <Toast />
    </ThemeProvider>
    </GestureHandlerRootView>
  )
}

export default App
