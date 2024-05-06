import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Card, Checkbox, RadioButton, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

import { RadioStatus, updateAnswer } from '../utils/choiceAnswerSlice';
import { ChoicesQuestionState } from '../utils/choicesQuestionsSlice';

import { RootState } from '@/stores/appStore';

type Props = { question: ChoicesQuestionState };

const Radio = ({ values }: { values: string[] }) => {
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
        <View key={i} style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
          <RadioButton.Android value={choice} />
          <Text style={{ flexShrink: 1 }} variant="labelLarge">
            {choice}
          </Text>
        </View>
      ))}
    </RadioButton.Group>
  );
};

const Check = ({ values }: { values: string[] }) => {
  const [checked, setChecked] = useState(false);

  return (
    <View>
      {values.map((c, i) => (
        <View key={i} style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
          <Checkbox.Android
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => {
              setChecked(!checked);
            }}
          />
          <Text style={{ flexShrink: 1 }} variant="labelLarge">
            {c}
          </Text>
        </View>
      ))}
    </View>
  );
};

export const ChoiceQuestionViewer = ({ question }: Props) => {
  return (
    <Card style={{ marginTop: 10 }}>
      <Card.Content>
        <Text variant="titleMedium">{question.choices.question}</Text>
        {question.choices.optionType === 'Radio Button' && (
          <View style={{ marginTop: 10 }}>
            <Radio values={question.choices.values} />
          </View>
        )}
        {question.choices.optionType === 'Check Box' && (
          <View style={{ marginTop: 10 }}>
            <Check values={question.choices.values} />
          </View>
        )}
      </Card.Content>
    </Card>
  );
};
