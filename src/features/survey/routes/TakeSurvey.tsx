import { useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Surface, useTheme, Button } from 'react-native-paper';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import { useSelector } from 'react-redux';

import { ChoiceQuestionViewer } from '../components/ChoiceQuestionViewer';
import { OpenEndedQuestionViewer } from '../components/OpenEndedQuestionViewer';
import { Progress } from '../components/Progress';
import { SliderQuestionViewer } from '../components/SliderQuestionViewer';
import { ChoicesQuestionState } from '../utils/choicesQuestionsSlice';
import { OpenEndedQuestionState } from '../utils/openEndedQuestionSlice';
import { SliderQuestionState } from '../utils/sliderQuestionSlice';

import { RootState } from '@/stores/appStore';

const WINDOW_WIDTH = Dimensions.get('window').width;

export const TakeSurvey = () => {
  const { dark } = useTheme();
  const allQuestions = useSelector((state: RootState) => state.allQuestion.questions);
  const [current, setCurrent] = useState(0);
  const [disableButton, setDisableButton] = useState(false);

  const positionX = useSharedValue(0);
  const opacicty = useSharedValue(1);

  const questionAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: positionX.value }],
      opacity: opacicty.value,
    };
  });

  const bringTheQuestionAnimation = () => {
    opacicty.value = withDelay(200, withTiming(1, { duration: 400 }));
    positionX.value = withTiming(0, { duration: 700 });
  };

  const removeTheQuestionAnimation = (direction: number) => {
    opacicty.value = withTiming(0, { duration: 800 });
    positionX.value = withDelay(200, withTiming(direction * WINDOW_WIDTH, { duration: 800 }));
  };

  const handleNext = () => {
    setDisableButton(true);

    setTimeout(() => {
      setCurrent((c) => c + 1);
      bringTheQuestionAnimation();
    }, 700);

    setTimeout(() => {
      setDisableButton(false);
    }, 1200);

    removeTheQuestionAnimation(-1);
  };

  const handlePrevious = () => {
    setDisableButton(true);

    setTimeout(() => {
      setCurrent((c) => c - 1);
      bringTheQuestionAnimation();
    }, 700);

    setTimeout(() => {
      setDisableButton(false);
    }, 1200);

    removeTheQuestionAnimation(1);
  };

  return (
    <Surface style={[styles.container, { backgroundColor: dark ? 'black' : 'white' }]}>
      <Progress question={current} />
      <Animated.ScrollView style={[styles.questionContainer, questionAnimatedStyle]}>
        {allQuestions.map(({ question, type }, i) => {
          if (type === 'Multiple Choice') {
            return (
              <ChoiceQuestionViewer
                show={current === i}
                question={question as ChoicesQuestionState}
                key={`${type}-${i}`}
              />
            );
          }
          if (type === 'Slider') {
            return (
              <SliderQuestionViewer
                show={current === i}
                question={question as SliderQuestionState}
                key={`${type}-${i}`}
              />
            );
          }
          if (type === 'Open-ended Question') {
            return (
              <OpenEndedQuestionViewer
                show={current === i}
                question={question as OpenEndedQuestionState}
                key={`${type}-${i}`}
              />
            );
          }
        })}
      </Animated.ScrollView>

      <View style={styles.bottomButtonContainer}>
        <Button
          style={styles.bottomButtons}
          mode="outlined"
          onPress={handlePrevious}
          disabled={current === 0 || disableButton}>
          Previous
        </Button>
        <Button
          style={styles.bottomButtons}
          mode="outlined"
          onPress={handleNext}
          disabled={current === allQuestions.length - 1 || disableButton}>
          Next
        </Button>
      </View>
    </Surface>
  );
};

const styles = StyleSheet.create({
  bottomButtons: {
    width: '30%',
    alignSelf: 'center',
    marginVertical: 10,
  },
  bottomButtonContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    padding: 10,
  },
  questionContainer: { height: '80%' },
});
