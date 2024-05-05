import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type PrivateRoutesBottomTabParamList = {
  Statistics: undefined;
  HomeStack: undefined;
  Profile: undefined;
};

export type PrivateRoutesScreenNavigationProp =
  NativeStackNavigationProp<PrivateRoutesBottomTabParamList>;
