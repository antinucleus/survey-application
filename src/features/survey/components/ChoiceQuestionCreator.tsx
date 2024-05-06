import { StyleSheet, ScrollView } from 'react-native';
import { TextInput, Surface, IconButton, Text } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';

import { addChoice, deleteChoice, updateChoice } from '../utils/choicesQuestionsSlice';

import { RootState } from '@/stores/appStore';

export const ChoiceQuestionCreator = () => {
  const dispatch = useDispatch();
  const { values: choices } = useSelector((state: RootState) => state.choicesQuestion.choices);

  const handleChoiceChange = (e: string, index: number) =>
    dispatch(updateChoice({ value: e, index }));

  const handleAddChoice = () => dispatch(addChoice(''));

  const handleRemoveChoice = (index: number) => dispatch(deleteChoice(index));

  return (
    <>
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
    </>
  );
};

const styles = StyleSheet.create({
  choice: { marginVertical: 5 },
  choiceContainer: { paddingTop: 10, width: '100%' },
  noChoiceText: {
    marginVertical: 5,
  },
});
