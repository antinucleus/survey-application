import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Button, Divider, List, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

import { SurveyRoutesScreenNavigationProp } from '../types';
import { formatStorageKey } from '../utils/formatStorageKey';

import { RootState } from '@/stores/appStore';
import { resetAllAnswer, setAllAnswer } from '@/utils/allAnswerSlice';
import { setQuestion } from '@/utils/allQuestionSlice';
import { deleteStoreValue, getStoreValue } from '@/utils/storage';

export const SurveyList = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<SurveyRoutesScreenNavigationProp>();
  const allSurveys = useSelector((state: RootState) => state.allSurvey.surveys);

  const handleOpenSurvey = async (survey: any, title: string) => {
    console.log('KEY::', formatStorageKey(title));
    const ans = await getStoreValue(formatStorageKey(title));

    if (ans) {
      dispatch(setAllAnswer(ans));
    }

    dispatch(setQuestion(survey));

    navigation.navigate('TakeSurvey', { surveyTitle: title });
  };

  const deleteItems = async () => {
    await deleteStoreValue('SURVEYAPP_ANSWERSDummyTestSurvey1');
    await deleteStoreValue('SURVEYAPP_ANSWERSDummyTestSurvey2');
    await deleteStoreValue('SURVEYAPP_ANSWERSDummyTestSurvey3');
    await deleteStoreValue('SURVEYAPP_ANSWERSTester');
  };

  const getItems = async () => {
    const ans1 = await getStoreValue('SURVEYAPP_ANSWERSDummyTestSurvey1');
    const ans2 = await getStoreValue('SURVEYAPP_ANSWERSDummyTestSurvey2');
    const ans3 = await getStoreValue('SURVEYAPP_ANSWERSDummyTestSurvey3');
    const ans4 = await getStoreValue('SURVEYAPP_ANSWERSTester');

    console.log({ ans1, ans2, ans3, ans4 });
  };

  return (
    <View style={styles.container}>
      {/* <Button onPress={deleteItems}>Delete Values</Button>
      <Button onPress={getItems}>Get ALl Values</Button> */}
      <Text variant="headlineSmall" style={{ alignSelf: 'center', marginBottom: 10 }}>
        Survey List
      </Text>
      <ScrollView style={{ height: '70%', overflow: 'scroll' }}>
        {allSurveys.map(({ survey, title }, i) => (
          <View style={styles.listItemContainer} key={`List-item-${i}-${title}`}>
            <List.Item
              onPress={() => handleOpenSurvey(survey, title)}
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
