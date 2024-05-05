import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type PublicRoutesStackParamList = {
  Login: undefined;
  SignUp: undefined;
};

export type PublicRoutesScreenNavigationProp =
  NativeStackNavigationProp<PublicRoutesStackParamList>;
