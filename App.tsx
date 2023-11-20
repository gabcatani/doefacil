/**
 * @format
 */

import 'react-native-gesture-handler';
import { MMKV } from 'react-native-mmkv';
import Toast from 'react-native-toast-message';
import { ThemeProvider } from 'styled-components';
import Routes from './src/navigation';
import theme from './src/theme';

export const storageLocal = new MMKV();

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Routes />
        <Toast />
      </ThemeProvider>
    </>
  );
}

export default App;
