import Slider from '@react-native-community/slider';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';

import { SliderQuestionState } from '../utils/sliderQuestionSlice';

type Props = { question: SliderQuestionState; show: boolean };

export const SliderQuestionViewer = ({ question, show }: Props) => {
  const [sliderValue, setSliderValue] = useState(question.slider.values.min);

  const handleSliderChange = (v: number) => setSliderValue(v);

  return (
    <Card style={[styles.card, { display: show ? 'flex' : 'none' }]}>
      <Card.Content>
        <Text variant="titleMedium">{question.slider.question}</Text>
        <Text>{sliderValue} </Text>
        <Slider
          style={{ width: 200, height: 10, opacity: show ? 1 : 0 }}
          value={sliderValue}
          onValueChange={handleSliderChange}
          minimumValue={question.slider.values.min}
          maximumValue={question.slider.values.max}
          step={1}
          minimumTrackTintColor="white"
          maximumTrackTintColor="black"
          thumbTintColor="red"
        />
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginTop: 10,
  },
});
