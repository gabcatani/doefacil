import { createDrawerNavigator } from '@react-navigation/drawer';
import { Horse } from 'phosphor-react-native';
import TermsOfUse from '../screens/Terms';
import TabRoutes from './tab.routes';

const Drawer = createDrawerNavigator();

export default function DrawerRoutes() {
  return (
    <Drawer.Navigator screenOptions={{ title: '' }}>
      <Drawer.Screen
        name="Terms"
        component={TermsOfUse}
        options={{
          drawerLabel: 'Termos de uso',
          drawerIcon: ({ color, size }) => (
            <Horse color="teal" weight="duotone" />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
