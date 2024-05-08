import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Surface, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

import { SurveyList } from '../components/SurveyList';
import { SurveyRoutesScreenNavigationProp } from '../types';

import { RootState } from '@/stores/appStore';
import { initAnswer } from '@/utils/allAnswerSlice';
import { setQuestion } from '@/utils/allQuestionSlice';

export const Landing = () => {
  const name = 'Tester';
  const navigation = useNavigation<SurveyRoutesScreenNavigationProp>();
  const dispatch = useDispatch();
  const allSurveys = useSelector((state: RootState) => state.allSurvey.surveys);
  const allAnswer = useSelector((state: RootState) => state.allAnswer.answers);

  useEffect(() => {
    for (const s of allSurveys) {
      dispatch(initAnswer([{ surveyAnswers: [], title: s.title }]));
    }
  }, []);

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
