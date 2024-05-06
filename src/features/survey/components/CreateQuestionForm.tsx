import { StyleSheet, View } from 'react-native';
import { TextInput, Portal, Modal, Button, Text, Switch, useTheme } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';

import { ChoiceQuestionCreator } from './ChoiceQuestionCreator';
import { SliderQuestionCreator } from './SliderQuestionCreator';
import {
  updateMultipleChoice,
  updateQuestion as updateChoiceQuestion,
} from '../utils/choicesQuestionsSlice';
import { updateQuestion as updateSliderQuestion } from '../utils/sliderQuestionSlice';

import { RootState } from '@/stores/appStore';

type Props = {
  modalVisibility: boolean;
  handleCloseQuestionForm: () => void;
};

export const CreateQuestionForm = ({ modalVisibility, handleCloseQuestionForm }: Props) => {
  const { dark } = useTheme();
  const dispatch = useDispatch();
  const { questionType } = useSelector((state: RootState) => state.currentQuestionProperties);
  const { multipleSelection, question: choiceQuestion } = useSelector(
    (state: RootState) => state.choicesQuestion.choices,
  );
  const { question: sliderQuestion } = useSelector(
    (state: RootState) => state.sliderQuestion.slider,
  );
  let question;

  if (questionType === 'Multiple Choice') {
    question = choiceQuestion;
  } else if (questionType === 'Slider') {
    question = sliderQuestion;
  }

  const handleQuestionChange = (e: string) => {
    let updateFunc: any;

    if (questionType === 'Multiple Choice') {
      updateFunc = updateChoiceQuestion;
    } else if (questionType === 'Slider') {
      updateFunc = updateSliderQuestion;
    }

    dispatch(updateFunc(e));
  };

  const handleSwitchValueChange = () => dispatch(updateMultipleChoice());

  const handleSaveChoices = () => {
    console.log('choices are saved');
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
            height: questionType === 'Slider' ? '40%' : '70%',
          },
        ]}
        dismissable={false}
        dismissableBackButton={false}>
        <View style={styles.topOptions}>
          <Button theme={{ roundness: 2 }} mode="contained" onPress={handleSaveChoices}>
            Save
          </Button>
          {(questionType === 'Multiple Choice' || questionType === 'Selections') && (
            <View style={styles.switchContainer}>
              <Text style={styles.multipleSelectionText}>Multiple selection</Text>
              <Switch
                value={multipleSelection}
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
