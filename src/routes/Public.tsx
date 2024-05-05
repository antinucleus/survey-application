import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { Login } from '../../src/features/auth/routes';
import { PublicRoutesStackParamList } from '../types';

const { Navigator, Screen } = createNativeStackNavigator<PublicRoutesStackParamList>();

export const Public = () => {
  return (
    <Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      <Screen name="Login" component={Login} />
    </Navigator>
  );
};
