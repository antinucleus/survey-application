import { StyleSheet, ScrollView, View } from 'react-native';
import { TextInput, IconButton, Text, Button, HelperText } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';

import { ChoiceOptionTypes } from '../types';
import {
  addChoice,
  deleteChoice,
  updateChoice,
  updateChoiceOptionType,
} from '../utils/choicesQuestionsSlice';
import { addError, removeError, updateEmptyError } from '../utils/errorSlice';

import { RootState } from '@/stores/appStore';

export const ChoiceQuestionCreator = () => {
  const dispatch = useDispatch();
  const { values: choices, optionType } = useSelector(
    (state: RootState) => state.choicesQuestion.choices,
  );

  const handleChoiceChange = (e: string, index: number) => {
    dispatch(updateChoice({ value: e, index }));

    if (e.length === 0) {
      dispatch(addError('choiceErrors'));
    } else {
      dispatch(removeError({ key: 'choiceErrors', index }));
    }
  };

  const handleAddChoice = () => {
    dispatch(addChoice(''));

    dispatch(addError('choiceErrors'));
  };
  const handleRemoveChoice = (index: number) => {
    dispatch(deleteChoice(index));
    dispatch(removeError({ key: 'choiceErrors', index }));

    // if (choices.length === 0) {
    //   dispatch(updateEmptyError(true));
    // }
  };
  const handleChoiceOptionTypeChange = (optionType: ChoiceOptionTypes) => {
    dispatch(updateChoiceOptionType(optionType));
  };

  const options: ChoiceOptionTypes[] = ['Radio Button', 'Check Box', 'Button'];

  return (
    <>
      <View style={styles.optionsContainer}>
        <Text variant="titleMedium" style={styles.title}>
          Select choice option type
        </Text>
        <View style={styles.buttonContainer}>
          {options.map((option, i) => (
            <Button
              theme={{ roundness: 2 }}
              mode={optionType === option ? 'outlined' : 'text'}
              style={styles.optionButton}
              onPress={() => handleChoiceOptionTypeChange(option)}
              key={`choice-option-${i}-${option}`}>
              {option}
            </Button>
          ))}
        </View>
      </View>
      {choices.length > 0 ? (
        <ScrollView style={styles.choiceContainer}>
          {choices.map((choice, i) => (
            <View style={styles.choiceInputContainer} key={`text-input-choice-${i}`}>
              <TextInput
                placeholder={`choice ${i + 1}`}
                style={styles.choice}
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
              <HelperText type="error" visible={choice.length === 0}>
                Choice can not be empty
              </HelperText>
            </View>
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
  choice: { marginVertical: 1 },
  choiceContainer: { paddingTop: 10, width: '100%' },
  choiceInputContainer: { width: '100%' },
  noChoiceText: {
    marginVertical: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 5,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionButton: {},
  optionsContainer: { marginTop: 20 },
  title: { alignSelf: 'flex-start' },
});
