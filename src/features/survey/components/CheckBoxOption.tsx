import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Checkbox, Text } from 'react-native-paper';
import { useDispatch } from 'react-redux';

import { CheckBoxStatus } from '../types';

import { updateAllAnswer } from '@/utils/allAnswerSlice';

type Props = {
  values: string[];
  multipleSelection: boolean;
  questionIndex: number;
};

export const CheckBoxOption = ({ values, multipleSelection, questionIndex }: Props) => {
  const dispatch = useDispatch();
  const [checkBoxValues, setCheckBoxValues] = useState<CheckBoxStatus[]>([]);

  const handleOnPressCheckBox = (status: CheckBoxStatus, index: number) => {
    const currentCheckBoxValues = [...checkBoxValues];

    if (multipleSelection) {
      currentCheckBoxValues[index] = status;
    } else {
      currentCheckBoxValues.forEach((_, i) => (currentCheckBoxValues[i] = 'unchecked'));
      currentCheckBoxValues[index] = status;
    }

    setCheckBoxValues(currentCheckBoxValues);

    dispatch(
      updateAllAnswer({
        answer: { answer: checkBoxValues, type: 'Multiple Choice' },
        answerIndex: questionIndex,
      }),
    );
  };

  return (
    <View>
      {values.map((c, i) => (
        <View key={i} style={styles.checkboxContaier}>
          <Checkbox.Android
            status={checkBoxValues[i]}
            onPress={() => {
              handleOnPressCheckBox(checkBoxValues[i] === 'checked' ? 'unchecked' : 'checked', i);
            }}
          />
          <Text style={styles.optionText} variant="labelLarge">
            {c}
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  checkboxContaier: { flexDirection: 'row', alignItems: 'center', marginVertical: 5 },
  optionText: { flexShrink: 1 },
});
