import { StyleSheet, View } from 'react-native';
import { TextInput, Portal, Modal, Button, Text, Switch, useTheme } from 'react-native-paper';
import { ThemeProp } from 'react-native-paper/lib/typescript/types';
import { useSelector, useDispatch } from 'react-redux';

import { ChoiceQuestionCreator } from './ChoiceQuestionCreator';
import { SliderQuestionCreator } from './SliderQuestionCreator';
import { updateMultipleChoice, updateQuestion } from '../utils/choicesQuestionsSlice';

import { RootState } from '@/stores/appStore';

type Props = {
  modalVisibility: boolean;
  handleCloseQuestionForm: () => void;
};

export const CreateQuestionForm = ({ modalVisibility, handleCloseQuestionForm }: Props) => {
  const { dark } = useTheme();
  const dispatch = useDispatch();
  const { questionType } = useSelector((state: RootState) => state.currentQuestionProperties);
  const { multipleSelection, question } = useSelector(
    (state: RootState) => state.choicesQuestion.choices,
  );

  const handleQuestionChange = (e: string) => dispatch(updateQuestion(e));

  const handleSwitchValueChange = () => dispatch(updateMultipleChoice());

  const handleSaveChoices = () => {
    console.log('choices are saved');
    handleCloseQuestionForm();
  };

  return (
    <Portal>
      <Modal
        visible={modalVisibility}
        contentContainerStyle={[styles.container, { backgroundColor: dark ? 'black' : 'white' }]}
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
    height: '50%',
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
