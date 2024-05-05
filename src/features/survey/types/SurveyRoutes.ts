import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type SurveyRoutesStackParamList = {
  CreateSurvey: undefined;
  Landing: undefined;
  TakeSurvey: undefined;
};

export type SurveyRoutesScreenNavigationProp =
  NativeStackNavigationProp<SurveyRoutesStackParamList>;
