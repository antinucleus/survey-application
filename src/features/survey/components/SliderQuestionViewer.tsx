import { StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';

import { SliderQuestionState } from '../utils/sliderQuestionSlice';

type Props = { question: SliderQuestionState; show: boolean };

export const SliderQuestionViewer = ({ question, show }: Props) => {
  return (
    <Card style={[styles.card, { display: show ? 'flex' : 'none' }]}>
      <Card.Content>
        <Text variant="titleMedium">{question.slider.question}</Text>
        <Text>tewt</Text>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginTop: 10,
  },
});
