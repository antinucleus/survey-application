import { StyleSheet, View, ScrollView } from 'react-native';
import { TextInput, Portal, Modal, Button, IconButton, Text, Switch } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';

import {
  addChoice,
  deleteChoice,
  updateChoice,
  updateMultipleChoice,
  updateQuestion,
} from '../utils/choicesQuestionsSlice';

import { RootState } from '@/stores/appStore';

type Props = {
  modalVisibility: boolean;
  handleCloseQuestionForm: () => void;
};

export const CreateQuestionForm = ({ modalVisibility, handleCloseQuestionForm }: Props) => {
  const dispatch = useDispatch();
  const {
    multipleSelection,
    question,
    values: choices,
  } = useSelector((state: RootState) => state.choicesQuestion.choices);

  const handleQuestionChange = (e: string) => dispatch(updateQuestion(e));

  const handleSwitchValueChange = () => dispatch(updateMultipleChoice());

  const handleChoiceChange = (e: string, index: number) =>
    dispatch(updateChoice({ value: e, index }));

  const handleAddChoice = () => dispatch(addChoice(''));

  const handleRemoveChoice = (index: number) => dispatch(deleteChoice(index));

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

        {choices.length > 0 ? (
          <ScrollView style={styles.choiceContainer}>
            {choices.map((choice, i) => (
              <TextInput
                placeholder={`choice ${i + 1}`}
                style={styles.choice}
                key={`text-input-choice-${i}`}
                mode="flat"
                value={choice}
                onChangeText={(e) => handleChoiceChange(e, i)}
                right={
                  <TextInput.Icon
                    onPress={() => handleRemoveChoice(i)}
                    icon="minus-circle"
                    color="green"
                  />
                }
              />
            ))}
          </ScrollView>
        ) : (
          <Text style={styles.noChoiceText}>There is no choice yet</Text>
        )}

        <IconButton mode="contained" icon="plus" size={20} onPress={handleAddChoice} />
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
