import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { CreateSurvey } from './CreateSurvey';
import { Landing } from './Landing';
import { TakeSurvey } from './TakeSurvey';
import { SurveyRoutesStackParamList } from '../types';

const { Navigator, Screen } = createNativeStackNavigator<SurveyRoutesStackParamList>();

export const Home = () => {
  return (
    <Navigator initialRouteName="Landing" screenOptions={{ headerShown: false }}>
      <Screen name="Landing" component={Landing} />
      <Screen name="CreateSurvey" component={CreateSurvey} />
      <Screen name="TakeSurvey" component={TakeSurvey} />
    </Navigator>
  );
};
