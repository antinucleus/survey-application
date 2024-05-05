import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

import { Profile } from '@/features/profile/routes';
import { Statistics } from '@/features/statistic/routes';
import { Home } from '@/features/survey/routes';
import { PrivateRoutesBottomTabParamList } from '@/types';

const { Navigator, Screen } = createBottomTabNavigator<PrivateRoutesBottomTabParamList>();

export const Private = () => {
  return (
    <Navigator
      initialRouteName="HomeStack"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const iconSize = focused ? size + 10 : size;
          let iconName: any;

          if (route.name === 'HomeStack') {
            iconName = 'home';
          } else if (route.name === 'Statistics') {
            iconName = 'graph';
          } else if (route.name === 'Profile') {
            iconName = 'account';
          }

          return <MaterialCommunityIcons name={iconName} size={iconSize} color={color} />;
        },
        tabBarActiveTintColor: 'darkgreen',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}>
      <Screen name="Statistics" component={Statistics} />
      <Screen name="HomeStack" component={Home} />
      <Screen name="Profile" component={Profile} />
    </Navigator>
  );
};
