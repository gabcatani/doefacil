import {NavigationContainer} from '@react-navigation/native';
import StackRoutes from './stack.routes';
import {IconContext} from 'phosphor-react-native';

export default function Routes() {
  return (
    <IconContext.Provider
      value={{
        color: 'limegreen',
        size: 32,
        weight: 'bold',
      }}>
      <NavigationContainer>
        <StackRoutes />
      </NavigationContainer>
    </IconContext.Provider>
  );
}
