import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { Button, Surface, Text } from 'react-native-paper';

import { SurveyRoutesScreenNavigationProp } from '../types/SurveyRoutes';

export const Landing = () => {
  const name = 'Tester';
  const navigation = useNavigation<SurveyRoutesScreenNavigationProp>();

  const handleNavigateCreateSurvey = () => navigation.navigate('CreateSurvey');
  const handleNavigateTakeSurvey = () => navigation.navigate('TakeSurvey');

  return (
    <Surface style={styles.container}>
      <Text>Welcome {name} </Text>
      <Button onPress={handleNavigateCreateSurvey}>Create Survey</Button>
      <Button onPress={handleNavigateTakeSurvey}> Take Survey</Button>
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    height: 'auto',
  },
});
