import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  Heart,
  Cube,
  Article,
  MapTrifold,
  AddressBook,
} from 'phosphor-react-native';
import React from 'react';
import Avaliation from '../screens/Avaliation';
import Donation from '../screens/Donation';
import Home from '../screens/Infomations';
import ItemsList from '../screens/ItemsList';
import Solicitations from '../screens/Solicitations';
import Test from '../screens/Test';

const Tab = createBottomTabNavigator();

export default function TabRoutes() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Maps"
    >
      <Tab.Screen
        name="Informations"
        component={Home}
        options={{
          tabBarLabel: 'Informações',
          tabBarIcon: ({ color, size }) => (
            <Cube color="teal" weight="duotone" />
          ),
        }}
      />
      <Tab.Screen
        name="Doar"
        component={Donation}
        options={{
          tabBarLabel: 'Doar',
          tabBarIcon: ({ color, size }) => (
            <Heart color="teal" weight="duotone" size={32} />
          ),
        }}
      />
      <Tab.Screen
        name="Maps"
        component={ItemsList}
        options={{
          tabBarLabel: 'Doações',
          tabBarIcon: ({ color, size }) => (
            <MapTrifold color="teal" weight="duotone" size={32} />
          ),
        }}
      />
      {/* <Tab.Screen
        name="Test"
        component={Test}
        options={{
          tabBarLabel: 'Teste',
          tabBarIcon: ({ color, size }) => (
            <MapTrifold color="teal" weight="duotone" size={32} />
          ),
        }}
      /> */}
      <Tab.Screen
        name="Solicitations"
        component={Solicitations}
        options={{
          tabBarLabel: 'Solicitações',
          tabBarIcon: ({ color, size }) => (
            <Article color="teal" weight="duotone" size={32} />
          ),
        }}
      />
      <Tab.Screen
        name="Avaliation"
        component={Avaliation}
        options={{
          tabBarLabel: 'Avalie',
          tabBarIcon: ({ color, size }) => (
            <AddressBook color="teal" weight="duotone" size={32} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
