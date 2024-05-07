import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { RadioButton, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

import { RadioStatus, updateAnswer } from '../utils/choiceAnswerSlice';

import { RootState } from '@/stores/appStore';

type Props = {
  values: string[];
};

export const RadioButtonOption = ({ values }: Props) => {
  const dispatch = useDispatch();
  const radioValue = useSelector((state: RootState) => state.choiceAnswer.radio);

  useEffect(() => {
    console.log(radioValue);
  }, [radioValue]);

  const handleRadioValueChange = (value: string) =>
    dispatch(
      updateAnswer({
        choiceOptionType: 'Radio Button',
        value: value as RadioStatus,
        answerIndex: 0,
      }),
    );

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
