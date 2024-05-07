import Slider from '@react-native-community/slider';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

import { SliderQuestionState } from '../utils/sliderQuestionSlice';

import { RootState } from '@/stores/appStore';
import { updateAllAnswer } from '@/utils/allAnswerSlice';

type Props = { question: SliderQuestionState; show: boolean; questionIndex: number };

export const SliderQuestionViewer = ({ question, show, questionIndex }: Props) => {
  const dispatch = useDispatch();
  const [sliderValue, setSliderValue] = useState(question.slider.values.min);
  const allAnswer = useSelector((state: RootState) => state.allAnswer.answers);

  useEffect(() => {
    console.log({ allAnswer });
    if (allAnswer && allAnswer[questionIndex] !== undefined) {
      setSliderValue(allAnswer[questionIndex].answer as number);
    }
  }, []);

  const handleSliderChange = (v: number) => setSliderValue(v);

  const handleSlideCompleted = (v: number) => {
    dispatch(
      updateAllAnswer({
        answer: { answer: v, type: 'Slider' },
        answerIndex: questionIndex,
      }),
    );
  };

  return (
    <Card style={[styles.card, { display: show ? 'flex' : 'none' }]}>
      <Card.Content>
        <Text variant="titleMedium">{question.slider.question}</Text>
        <Text>{sliderValue} </Text>
        <Slider
          style={{ width: 200, height: 10, opacity: show ? 1 : 0 }}
          value={sliderValue}
          onValueChange={handleSliderChange}
          onSlidingComplete={handleSlideCompleted}
          minimumValue={question.slider.values.min}
          maximumValue={question.slider.values.max}
          step={1}
          minimumTrackTintColor="white"
          maximumTrackTintColor="black"
          thumbTintColor="lightblue"
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
