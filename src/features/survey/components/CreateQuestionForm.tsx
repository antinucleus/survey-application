import { useEffect, useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput, Portal, Modal, Button, Text, Switch, useTheme } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';

import { ChoiceQuestionCreator } from './ChoiceQuestionCreator';
import { OpenEndedQuestionCreator } from './OpenEndedQuestionCreator';
import { SliderQuestionCreator } from './SliderQuestionCreator';
import {
  updateMultipleChoice,
  updateQuestion as updateChoiceQuestion,
  resetChoices,
  ChoicesQuestionState,
} from '../utils/choicesQuestionsSlice';
import {
  OpenEndedQuestionState,
  updateQuestion as updateOpenEndedQuestion,
  resetOpenEnded,
} from '../utils/openEndedQuestionSlice';
import {
  SliderQuestionState,
  updateQuestion as updateSliderQuestion,
  resetSlider,
} from '../utils/sliderQuestionSlice';

import { RootState } from '@/stores/appStore';
import { addQuetion, updateQuestion } from '@/utils/allQuestionSlice';

type Props = {
  modalVisibility: boolean;
  handleCloseQuestionForm: () => void;
};

export const CreateQuestionForm = ({ modalVisibility, handleCloseQuestionForm }: Props) => {
  const { dark } = useTheme();
  const dispatch = useDispatch();
  const { questionType, questionOperation, questionKey } = useSelector(
    (state: RootState) => state.currentQuestionProperties,
  );
  const choicesQuestion = useSelector((state: RootState) => state.choicesQuestion);
  const sliderQuestion = useSelector((state: RootState) => state.sliderQuestion);
  const openEndedQuestion = useSelector((state: RootState) => state.openEndedQuestion);

  let question = '';
  let updateFunc: any;
  let resetFunc: any;
  let questionState: ChoicesQuestionState | SliderQuestionState | OpenEndedQuestionState;

  console.log({ questionType });

  if (questionType === 'Multiple Choice') {
    question = choicesQuestion.choices.question;
    updateFunc = updateChoiceQuestion;
    resetFunc = resetChoices;
    questionState = choicesQuestion;
  } else if (questionType === 'Slider') {
    question = sliderQuestion.slider.question;
    updateFunc = updateSliderQuestion;
    resetFunc = resetSlider;
    questionState = sliderQuestion;
  } else if (questionType === 'Open-ended Question') {
    question = openEndedQuestion.openEnded.question;
    updateFunc = updateOpenEndedQuestion;
    resetFunc = resetOpenEnded;
    questionState = openEndedQuestion;
  }

  const handleQuestionChange = (e: string) => {
    dispatch(updateFunc(e));
  };

  const handleSwitchValueChange = () => dispatch(updateMultipleChoice());

  const handleSaveChoices = () => {
    if (questionOperation === 'Add') {
      dispatch(
        addQuetion({
          question: questionState,
          type: questionType,
        }),
      );
    } else if (questionOperation === 'Update') {
      dispatch(
        updateQuestion({
          q: { question: questionState, type: questionType },
          questionIndex: questionKey,
        }),
      );
    }

    dispatch(resetFunc());
    handleCloseQuestionForm();
  };

  return (
    <Portal>
      <Modal
        visible={modalVisibility}
        contentContainerStyle={[
          styles.container,
          {
            backgroundColor: dark ? 'black' : 'white',
            height:
              questionType === 'Slider' || questionType === 'Open-ended Question' ? '40%' : '70%',
          },
        ]}
        dismissable={false}
        dismissableBackButton={false}>
        <View style={styles.topOptions}>
          <Button theme={{ roundness: 2 }} mode="contained" onPress={handleSaveChoices}>
            Save
          </Button>
          {questionType === 'Multiple Choice' && (
            <View style={styles.switchContainer}>
              <Text style={styles.multipleSelectionText}>Multiple selection</Text>
              <Switch
                value={choicesQuestion.choices.multipleSelection}
                onValueChange={handleSwitchValueChange as () => void}
              />
            </View>
          )}
        </View>

        <TextInput
          mode="outlined"
          label="Question"
          placeholder="Enter the question"
          autoCorrect={false}
          value={question}
          style={styles.question}
          onChangeText={handleQuestionChange}
        />

        {questionType === 'Multiple Choice' && <ChoiceQuestionCreator />}
        {questionType === 'Slider' && <SliderQuestionCreator />}
        {questionType === 'Open-ended Question' && <OpenEndedQuestionCreator />}
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    borderRadius: 10,
    padding: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  multipleSelectionText: { marginRight: 10 },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  topOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  question: { width: '100%', marginTop: 10 },
});
