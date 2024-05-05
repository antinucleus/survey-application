import { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { TextInput, Portal, Modal, Button, IconButton, Text } from 'react-native-paper';

type Props = {
  modalVisibility: boolean;
  handleCloseQuestionForm: () => void;
};

export const CreateQuestionForm = ({ modalVisibility, handleCloseQuestionForm }: Props) => {
  const [question, setQuestion] = useState('');
  const [choices, setChoices] = useState<string[]>([]);

  const handleQuestionChange = (e: string) => setQuestion(e);

  const handleChoiceChange = (e: string, index: number) => {
    const currentChoices = [...choices];
    currentChoices[index] = e;
    setChoices(currentChoices);
  };

  const handleAddChoice = () => {
    const currentChoices = [...choices];
    currentChoices.push('');
    setChoices(currentChoices);
  };

  const handleRemoveChoice = (index: number) => {
    const currentChoices = [...choices];
    currentChoices.splice(index, 1);
    setChoices(currentChoices);
  };

  const handleSaveChoices = () => {
    console.log('choices are saved');
    handleCloseQuestionForm();
  };

  return (
    <Portal>
      {/* <Portal>
        <Dialog visible={dialogVisibility} dismissable={false} dismissableBackButton={false}>
          <Dialog.Title>Changes are not saved</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">Are you sure you want to exit without saving?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={handleDialogOnDismiss}>Yes</Button>
            <Button onPress={handleCloseDialog}>No</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal> */}
      <Modal
        visible={modalVisibility}
        contentContainerStyle={styles.container}
        dismissable={false}
        dismissableBackButton={false}>
        <View style={{ flexDirection: 'row', alignSelf: 'flex-end' }}>
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
          <Text style={{ marginVertical: 5 }}>There is no choice yet</Text>
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
    backgroundColor: 'white',
    padding: 20,
    flex: 1 / 2,
    height: 'auto',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  question: { width: '100%' },
});
