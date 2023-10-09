/**
 * @format
 */

import 'react-native-gesture-handler'
import Routes from './src/navigation'
import Toast from 'react-native-toast-message';

function App() {
  return (
    <> 
      <Routes />
      <Toast />
    </>
  )
}

export default App
