import { View } from 'react-native';
import { Card, Text } from 'react-native-paper';

import { ButtonOption } from './ButtonOption';
import { CheckBoxOption } from './CheckBoxOption';
import { RadioButtonOption } from './RadioButtonOption';
import { ChoicesQuestionState } from '../utils/choicesQuestionsSlice';

type Props = { question: ChoicesQuestionState; show: boolean };

export const ChoiceQuestionViewer = ({ question, show }: Props) => {
  return (
    <Card
      style={{
        marginTop: 10,
        display: show ? 'flex' : 'none',
      }}>
      <Card.Content>
        <Text variant="titleMedium">{question.choices.question}</Text>
        {question.choices.optionType === 'Radio Button' && (
          <View style={{ marginTop: 10 }}>
            <RadioButtonOption values={question.choices.values} />
          </View>
        )}
        {question.choices.optionType === 'Check Box' && (
          <View style={{ marginTop: 10 }}>
            <CheckBoxOption values={question.choices.values} />
          </View>
        )}
        {question.choices.optionType === 'Button' && (
          <View style={{ marginTop: 10 }}>
            <ButtonOption values={question.choices.values} />
          </View>
        )}
      </Card.Content>
    </Card>
  );
};
