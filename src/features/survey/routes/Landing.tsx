import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { Button, Surface, Text } from 'react-native-paper';
import { useDispatch } from 'react-redux';

import { SurveyList } from '../components/SurveyList';
import { SurveyRoutesScreenNavigationProp } from '../types';

import { setQuestion } from '@/utils/allQuestionSlice';

export const Landing = () => {
  const name = 'Tester';
  const navigation = useNavigation<SurveyRoutesScreenNavigationProp>();
  const dispatch = useDispatch();

  const handleNavigateCreateSurvey = () => {
    dispatch(setQuestion([]));
    navigation.navigate('CreateSurvey');
  };

  return (
    <Surface style={styles.container}>
      <SurveyList />
      <Text>Welcome {name} </Text>
      <Button onPress={handleNavigateCreateSurvey}>Create Survey</Button>
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
