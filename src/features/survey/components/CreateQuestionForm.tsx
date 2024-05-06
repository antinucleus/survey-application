import { StyleSheet, View } from 'react-native';
import { TextInput, Portal, Modal, Button, Text, Switch } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';

import { ChoiceQuestionCreator } from './ChoiceQuestionCreator';
import { updateMultipleChoice, updateQuestion } from '../utils/choicesQuestionsSlice';

import { RootState } from '@/stores/appStore';

type Props = {
  modalVisibility: boolean;
  handleCloseQuestionForm: () => void;
};

export const CreateQuestionForm = ({ modalVisibility, handleCloseQuestionForm }: Props) => {
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
        contentContainerStyle={styles.container}
        dismissable={false}
        dismissableBackButton={false}>
        <View style={styles.topOptions}>
          <View style={styles.switchContainer}>
            <Text style={styles.multipleSelectionText}>Multiple selection</Text>
            <Switch
              value={multipleSelection}
              onValueChange={handleSwitchValueChange as () => void}
            />
          </View>
          <Button mode="contained" onPress={handleSaveChoices}>
            Save
          </Button>
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
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  choice: { marginVertical: 5 },
  choiceContainer: { paddingTop: 10, width: '100%' },
  container: {
    margin: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    padding: 15,
    flex: 1,
    height: 'auto',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  multipleSelectionText: { marginRight: 10 },
  noChoiceText: {
    marginVertical: 5,
  },
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
