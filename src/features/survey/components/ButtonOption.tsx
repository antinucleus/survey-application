import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';

import { updateAnswer } from '../utils/choiceAnswerSlice';

import { RootState } from '@/stores/appStore';

type Props = {
  values: string[];
};

export const ButtonOption = ({ values }: Props) => {
  const dispatch = useDispatch();
  const buttonValues = useSelector((state: RootState) => state.choiceAnswer.button);

  const handleOnPressButton = (status: boolean, index: number) => {
    console.log({ status, index });
    dispatch(
      updateAnswer({
        choiceOptionType: 'Button',
        answerIndex: index,
        value: status,
      }),
    );
  };

  return (
    <View style={styles.container}>
      {values.map((c, i) => (
        <View key={i} style={styles.buttonContaier}>
          <Button
            theme={{ roundness: 2 }}
            mode={buttonValues[i] ? 'contained' : 'text'}
            onPress={() => {
              handleOnPressButton(!buttonValues[i], i);
            }}>
            {c}
          </Button>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContaier: { flexDirection: 'row', alignItems: 'center', margin: 5 },
  container: { flexDirection: 'row', flexWrap: 'wrap' },
  optionText: { flexShrink: 1 },
});
