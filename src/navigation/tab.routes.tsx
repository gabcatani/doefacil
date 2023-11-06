import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Heart, Cube, Article, MapTrifold, Gear} from 'phosphor-react-native';
import Home from '../screens/Home';
import Config from '../screens/Config';
import Mural from '../screens/Mural';
import ItemsList from '../screens/ItemsList';
import Donation from '../screens/Donation';

const Tab = createBottomTabNavigator();

export default function TabRoutes() {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Informações',
          tabBarIcon: ({color, size}) => <Cube color="teal" weight="duotone" />,
        }}
      />
      <Tab.Screen
        name="Doar"
        component={Donation}
        options={{
          tabBarLabel: 'Doar',
          tabBarIcon: ({color, size}) => (
            <Heart color="teal" weight="duotone" size={32} />
          ),
        }}
      />
      <Tab.Screen
        name="Maps"
        component={ItemsList}
        options={{
          tabBarLabel: 'Mapa',
          tabBarIcon: ({color, size}) => (
            <MapTrifold color="teal" weight="duotone" size={32} />
          ),
        }}
      />
      <Tab.Screen
        name="Feed"
        component={Mural}
        options={{
          tabBarLabel: 'Mural',
          tabBarIcon: ({color, size}) => (
            <Article color="teal" weight="duotone" size={32} />
          ),
        }}
      />
      <Tab.Screen
        name="Config"
        component={Config}
        options={{
          tabBarLabel: 'Configurações',
          tabBarIcon: ({color, size}) => (
            <Gear color="teal" weight="duotone" size={32} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
