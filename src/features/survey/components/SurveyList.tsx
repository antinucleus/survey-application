import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Button, Divider, List } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

import { SurveyRoutesScreenNavigationProp } from '../types';

import { SURVEY_ANSWERS } from '@/config';
import { RootState } from '@/stores/appStore';
import { setAllAnswer } from '@/utils/allAnswerSlice';
import { setQuestion } from '@/utils/allQuestionSlice';
import { deleteStoreValue, getStoreValue } from '@/utils/storage';

export const SurveyList = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<SurveyRoutesScreenNavigationProp>();
  const allSurveys = useSelector((state: RootState) => state.allSurvey.surveys);

  const handleOpenSurvey = async (survey: any) => {
    const ans = await getStoreValue(SURVEY_ANSWERS);
    console.log({ ans });
    if (ans) {
      dispatch(setAllAnswer(ans));
    }
    dispatch(setQuestion(survey));
    navigation.navigate('TakeSurvey');
    console.log(survey);
  };

  const deleteItems = async () => {
    await deleteStoreValue(SURVEY_ANSWERS);
  };

  return (
    <View style={styles.container}>
      <Button onPress={deleteItems}>Delte Values</Button>
      <ScrollView style={{ height: '70%', overflow: 'scroll' }}>
        {allSurveys.map(({ survey, title }, i) => (
          <View style={styles.listItemContainer} key={`List-item-${i}-${title}`}>
            <List.Item
              onPress={() => handleOpenSurvey(survey)}
              title={title}
              descriptionNumberOfLines={4}
            />
            <Divider />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  listItemContainer: { marginBottom: 5 },
  optionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  saveButton: { width: '30%', marginBottom: 10 },
  saveButtonContainer: { padding: 10, marginBottom: 10 },
});
