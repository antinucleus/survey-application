import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Divider, List, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

import { SurveyRoutesScreenNavigationProp } from '../types';
import { updateCurrentSurveyKey } from '../utils/currentSurveyPropertiesSlice';

import { RootState } from '@/stores/appStore';
import { setQuestion } from '@/utils/allQuestionSlice';

export const SurveyList = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<SurveyRoutesScreenNavigationProp>();
  const allSurveys = useSelector((state: RootState) => state.allSurvey.surveys);

  const handleOpenSurvey = async (survey: any, title: string, index: number) => {
    dispatch(updateCurrentSurveyKey(index));

    dispatch(setQuestion(survey));

    navigation.navigate('TakeSurvey', { surveyTitle: title });
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineSmall" style={{ alignSelf: 'center', marginBottom: 10 }}>
        Survey List
      </Text>
      <ScrollView style={{ height: '70%', overflow: 'scroll' }}>
        {allSurveys.map(({ survey, title }, i) => (
          <View style={styles.listItemContainer} key={`List-item-${i}-${title}`}>
            <List.Item
              onPress={() => handleOpenSurvey(survey, title, i)}
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
