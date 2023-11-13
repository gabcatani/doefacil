/**
 * @format
 */

import 'react-native-gesture-handler'
import Routes from './src/navigation'
import Toast from 'react-native-toast-message';
import { ThemeProvider } from 'styled-components';
import theme from './src/theme'; 
import { MMKV } from 'react-native-mmkv';

export const storageLocal = new MMKV();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes />
      <Toast />
    </ThemeProvider>
  )
}

export default App
