import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AvaliationReturn from '../screens/AvaliationReturn';
import ItemDetails from '../screens/ItemDetails';
import Login from '../screens/Login';
import RecoverPassword from '../screens/RecoverPassword';
import Solicitation from '../screens/Solicitation';
import Splash from '../screens/Splash';
import TabRoutes from './tab.routes';

const Stack = createNativeStackNavigator();

export default function StackRoutes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="RecoverPassword" component={RecoverPassword} />
      <Stack.Screen name="Auth" component={TabRoutes} />
      <Stack.Screen name="ItemDetails" component={ItemDetails} />
      <Stack.Screen name="AvaliationReturn" component={AvaliationReturn} />
      <Stack.Screen name="Solicitation" component={Solicitation} />
    </Stack.Navigator>
  );
}
