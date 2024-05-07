import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { RadioButton, Text } from 'react-native-paper';
import { useDispatch } from 'react-redux';

import { RadioStatus } from '../types';

import { updateAllAnswer } from '@/utils/allAnswerSlice';

type Props = {
  values: string[];
  multipleSelection: boolean;
  questionIndex: number;
};

export const RadioButtonOption = ({ values, questionIndex }: Props) => {
  const dispatch = useDispatch();
  const [radioValue, setRadioValue] = useState<RadioStatus>('unchecked');

  const handleRadioValueChange = (value: string) => {
    setRadioValue(value as RadioStatus);

    dispatch(
      updateAllAnswer({
        answer: { answer: value as RadioStatus, type: 'Multiple Choice' },
        answerIndex: questionIndex,
      }),
    );
  };

  return (
    <RadioButton.Group value={radioValue} onValueChange={handleRadioValueChange}>
      {values.map((choice, i) => (
        <View key={i} style={styles.radioButtonContaier}>
          <RadioButton.Android value={choice} />
          <Text style={styles.optionText} variant="labelLarge">
            {choice}
          </Text>
        </View>
      ))}
    </RadioButton.Group>
  );
};

const styles = StyleSheet.create({
  radioButtonContaier: { flexDirection: 'row', alignItems: 'center', marginVertical: 5 },
  optionText: { flexShrink: 1 },
});
