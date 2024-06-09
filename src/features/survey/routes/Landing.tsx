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
  const navigation = useNavigation<SurveyRoutesScreenNavigationProp>();
  const dispatch = useDispatch();
  const allSurveys = useSelector((state: RootState) => state.allSurvey.surveys);
  const { nickname } = useSelector((state: RootState) => state.userInfo);

  useEffect(() => {
    allSurveys.forEach(() => dispatch(initAnswer([{ surveyAnswers: [] }])));
  }, []);

  const handleNavigateCreateSurvey = () => {
    dispatch(setQuestion([]));
    navigation.navigate('CreateSurvey');
  };

  return (
    <Surface style={styles.container}>
      <SurveyList />
      <Text>Welcome {nickname} </Text>
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
