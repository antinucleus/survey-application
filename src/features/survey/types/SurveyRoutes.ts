import type { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type SurveyRoutesStackParamList = {
  CreateSurvey: undefined;
  Landing: undefined;
  TakeSurvey: { surveyTitle: string };
};

export type TakeSurveyScreenRouteProp = RouteProp<SurveyRoutesStackParamList, 'TakeSurvey'>;

export type SurveyRoutesScreenNavigationProp =
  NativeStackNavigationProp<SurveyRoutesStackParamList>;
