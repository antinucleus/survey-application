import { View } from 'react-native';
import { Card, Text } from 'react-native-paper';

import { ButtonOption } from './ButtonOption';
import { CheckBoxOption } from './CheckBoxOption';
import { RadioButtonOption } from './RadioButtonOption';
import { ChoicesQuestionState } from '../utils/choicesQuestionsSlice';

type Props = { question: ChoicesQuestionState; show: boolean; questionIndex: number };

export const ChoiceQuestionViewer = ({
  question: {
    choices: { values, multipleSelection, optionType, question },
  },
  show,
  questionIndex,
}: Props) => {
  return (
    <Card
      style={{
        marginTop: 10,
        display: show ? 'flex' : 'none',
      }}>
      <Card.Content>
        <Text variant="titleMedium">{question}</Text>
        {optionType === 'Radio Button' && (
          <View style={{ marginTop: 10 }}>
            <RadioButtonOption
              questionIndex={questionIndex}
              values={values}
              multipleSelection={multipleSelection}
            />
          </View>
        )}
        {optionType === 'Check Box' && (
          <View style={{ marginTop: 10 }}>
            <CheckBoxOption
              questionIndex={questionIndex}
              values={values}
              multipleSelection={multipleSelection}
            />
          </View>
        )}
        {optionType === 'Button' && (
          <View style={{ marginTop: 10 }}>
            <ButtonOption
              questionIndex={questionIndex}
              values={values}
              multipleSelection={multipleSelection}
            />
          </View>
        )}
      </Card.Content>
    </Card>
  );
};
