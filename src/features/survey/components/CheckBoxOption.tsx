import { View, StyleSheet } from 'react-native';
import { Checkbox, Text } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';

import { CheckBoxStatus, updateAnswer } from '../utils/choiceAnswerSlice';

import { RootState } from '@/stores/appStore';

type Props = {
  values: string[];
};

export const CheckBoxOption = ({ values }: Props) => {
  const dispatch = useDispatch();
  const checkBoxValues = useSelector((state: RootState) => state.choiceAnswer.checkBox);

  const handleOnPressCheckBox = (status: CheckBoxStatus, index: number) => {
    console.log({ status, index });
    dispatch(
      updateAnswer({
        choiceOptionType: 'Check Box',
        answerIndex: index,
        value: status,
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
