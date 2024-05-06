import { View, StyleSheet, ScrollView } from 'react-native';
import { Button, Divider, IconButton, List } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';

import { QuestionTypes } from '../types';
import { setChoices, ChoicesQuestionState } from '../utils/choicesQuestionsSlice';
import {
  updateCurrentQuestionOperation,
  updateCurrentQuestionKey,
  updateCurrentQuestionType,
} from '../utils/currentQuestionPropertiesSlice';
import { setOpenEnded, OpenEndedQuestionState } from '../utils/openEndedQuestionSlice';
import { setSlider, SliderQuestionState } from '../utils/sliderQuestionSlice';

import { RootState } from '@/stores/appStore';
import { deleteQuestion } from '@/utils/allQuestionSlice';

type Props = { listItemOnPress: () => void };

export const QuestionsList = ({ listItemOnPress }: Props) => {
  const dispatch = useDispatch();
  const allQuestion = useSelector((state: RootState) => state.allQuestion.questions);

  const handleEdit = (index: number, type: QuestionTypes) => {
    dispatch(updateCurrentQuestionType(type));
    dispatch(updateCurrentQuestionKey(index));
    dispatch(updateCurrentQuestionOperation('Update'));

    if (type === 'Multiple Choice') {
      dispatch(setChoices(allQuestion[index].question as ChoicesQuestionState));
    } else if (type === 'Slider') {
      dispatch(setSlider(allQuestion[index].question as SliderQuestionState));
    } else if (type === 'Open-ended Question') {
      dispatch(setOpenEnded(allQuestion[index].question as OpenEndedQuestionState));
    }

    listItemOnPress();
  };

  const handleDelete = (index: number) => {
    dispatch(deleteQuestion(index));
  };

  const formatQuestion = (q: string) => q.slice(0, 20) + '...';

  const des = (type: QuestionTypes, q: any) => {
    let description = 'Question: ';
    if (type === 'Multiple Choice') {
      description += `${formatQuestion(q.choices.question)}\nChoices: ${q.choices.values.length}\nMultiple Selection: ${q.choices.multipleSelection}\nOption Type: ${q.choices.optionType}`;
    } else if (type === 'Slider') {
      description += `${formatQuestion(q.slider.question)}\nMinimum Value: ${q.slider.values.min}\nMaximum Value: ${q.slider.values.max}`;
    } else if (type === 'Open-ended Question') {
      description += `${formatQuestion(q.openEnded.question)}\nMax Character Length: ${q.openEnded.values.maxLength}`;
    }

    return description;
  };

  return (
    <View style={styles.container}>
      <View style={styles.saveButtonContainer}>
        <Button theme={{ roundness: 2 }} style={styles.saveButton} mode="contained">
          Save
        </Button>
        <Divider />
      </View>
      <ScrollView style={{ height: '70%', overflow: 'scroll' }}>
        {allQuestion.map((q, i) => (
          <View style={styles.listItemContainer} key={`List-item-${i}-${q.type}`}>
            <List.Item
              right={() => (
                <View style={styles.optionsContainer}>
                  <IconButton
                    icon="pencil"
                    size={20}
                    iconColor="#5AB2FF"
                    onPress={() => handleEdit(i, q.type)}
                  />
                  <IconButton
                    icon="delete"
                    size={20}
                    iconColor="tomato"
                    onPress={() => handleDelete(i)}
                  />
                </View>
              )}
              title={q.type}
              description={des(q.type, q.question)}
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
