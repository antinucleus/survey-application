import { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '@/stores/appStore';
import { updateAllAnswer } from '@/utils/allAnswerSlice';

type Props = {
  values: string[];
  multipleSelection: boolean;
  questionIndex: number;
};

export const ButtonOption = ({ values, multipleSelection, questionIndex }: Props) => {
  const dispatch = useDispatch();
  const [buttonValues, setButtonValues] = useState<boolean[]>([]);
  const allAnswer = useSelector((state: RootState) => state.allAnswer.answers);
  const { surveyKey } = useSelector((state: RootState) => state.currentSurveyProperties);

  useEffect(() => {
    if (allAnswer && allAnswer[surveyKey].surveyAnswers.length > 0) {
      if (allAnswer[surveyKey].surveyAnswers[questionIndex]) {
        setButtonValues(allAnswer[surveyKey].surveyAnswers[questionIndex].answer as boolean[]);
      }
    }
  }, []);

  const handleButtonOnPress = (status: boolean, index: number) => {
    const currentButtonValues = [...buttonValues];

    if (multipleSelection) {
      currentButtonValues[index] = status;
    } else {
      currentButtonValues.forEach((_, i) => (currentButtonValues[i] = false));
      currentButtonValues[index] = status;
    }

    dispatch(
      updateAllAnswer({
        answer: { answer: currentButtonValues, type: 'Multiple Choice' },
        answerIndex: questionIndex,
        surveyIndex: surveyKey,
      }),
    );
    setButtonValues(currentButtonValues);
  };

  return (
    <View style={styles.container}>
      {values.map((c, i) => (
        <View key={i} style={styles.buttonContaier}>
          <Button
            theme={{ roundness: 2 }}
            mode={buttonValues[i] ? 'contained' : 'text'}
            onPress={() => {
              handleButtonOnPress(!buttonValues[i], i);
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
