import { View, StyleSheet } from 'react-native';
import { IconButton, List } from 'react-native-paper';
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

type Props = { listItemOnPress: () => void };

export const QuestionsList = ({ listItemOnPress }: Props) => {
  const dispatch = useDispatch();
  const allQuestion = useSelector((state: RootState) => state.allQuestion.questions);

  const handleListItemOnpress = (index: number, type: QuestionTypes) => {
    listItemOnPress();
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

    console.log('[QUESTION KEY]', allQuestion[index].key, '[INDEX]:', index);
  };

  return (
    <List.AccordionGroup>
      <View style={styles.accordionContainer}>
        <List.Accordion title="Questions" id="1">
          {allQuestion.map((q, i) => (
            <List.Item
              key={`List-item-${i}-${q.type}`}
              right={() => (
                <IconButton
                  icon="pencil"
                  size={20}
                  onPress={() => handleListItemOnpress(i, q.type)}
                />
              )}
              title={q.type}
            />
          ))}
        </List.Accordion>
      </View>
    </List.AccordionGroup>
  );
};

const styles = StyleSheet.create({
  accordionContainer: {
    width: '100%',
  },
});
